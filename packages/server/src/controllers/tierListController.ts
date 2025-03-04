import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { TierList } from "../entity/TierList";
import { TierEntry } from "../entity/TierEntry";
import { Contestant } from "../entity/Contestant";
import { Stage } from "../types/Stage";
import crypto from "crypto";

const tierListRepository = AppDataSource.getRepository(TierList);
const tierEntryRepository = AppDataSource.getRepository(TierEntry);
const contestantRepository = AppDataSource.getRepository(Contestant);

// Create a new tier list
export const createTierList = async (req: Request, res: Response) => {
  try {
    const { name, isPublic, stage } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Generate a unique share code (4 capital letters)
    let shareCode;
    let isUnique = false;
    
    while (!isUnique) {
      // Generate a random string of 4 capital letters
      shareCode = Array(6)
      .fill(0)
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
      .join('');
      
      // Check if the code is already in use
      const existingList = await tierListRepository.findOne({
      where: { shareCode }
      });
      
      if (!existingList) {
      isUnique = true;
      }
    }

    const tierList = tierListRepository.create({
      name,
      isPublic: isPublic || false,
      shareCode,
      stage: stage || Stage.GRAND_FINAL, // Default to grand final
      user
    });

    await tierListRepository.save(tierList);

    res.status(201).json({
      id: tierList.id,
      name: tierList.name,
      isPublic: tierList.isPublic,
      shareCode: tierList.shareCode,
      stage: tierList.stage,
      createdAt: tierList.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tier lists for current user
export const getUserTierLists = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const tierLists = await tierListRepository.find({
      where: { user: { id: user.id } },
      order: { createdAt: "DESC" }
    });

    res.json(tierLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get tier list by ID or share code
export const getTierList = async (req: Request, res: Response) => {
  try {
    const { idOrCode } = req.params;
    
    // First try to find by ID
    let tierList = null;
    try {
      tierList = await tierListRepository.findOne({
        where: { id: idOrCode },
        relations: ["entries", "entries.contestant", "user"],
        order: {
          entries: {
            order: "ASC"
          }
        }
      });
    } catch (error) {
      // Silently handle error and continue to try shareCode
    }
    
    // If not found, try to find by share code
    if (!tierList) {
      tierList = await tierListRepository.findOne({
        where: { shareCode: idOrCode },
        relations: ["entries", "entries.contestant", "user"],
        order: {
          entries: {
            order: "ASC"
          }
        }
      });
    }
    
    if (!tierList) {
      return res.status(404).json({ message: "Tier list not found" });
    }
    
    // Check if user has access (public tier lists are accessible to anyone)
    const user = req.user;
    const isOwner = user && tierList.user && tierList.user.id === user.id;

    if (!tierList.isPublic && !isOwner) {
      return res.status(403).json({ message: "Access denied: This tier list is private" });
    }
    
    // Remove sensitive user data
    const { password, ...userData } = tierList.user;
    
    res.json({
      ...tierList,
      user: userData
    });
  } catch (error) {
    console.error("Error fetching tier list:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update tier list entries
export const updateTierList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { entries, name, isPublic, stage } = req.body;
    const user = req.user;

    console.log("user", user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Find the tier list
    const tierList = await tierListRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: ["entries"]
    });

    if (!tierList) {
      return res.status(404).json({ message: "Tier list not found" });
    }

    // Update tier list properties
    if (name) tierList.name = name;
    if (isPublic !== undefined) tierList.isPublic = isPublic;
    if (stage) tierList.stage = stage;

    // If entries are provided, update them
    if (entries && Array.isArray(entries)) {
      // Delete existing entries
      await tierEntryRepository.remove(tierList.entries);
      
      // Create new entries
      const newEntries: TierEntry[] = [];
      
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const contestant = await contestantRepository.findOne({
          where: { id: entry.contestantId }
        });
        
        if (contestant) {
          const tierEntry = tierEntryRepository.create({
            tier: entry.tier,
            order: i, // Set the order based on the array index
            contestant,
            tierList
          });
          
          newEntries.push(tierEntry);
        }
      }
      
      // Save new entries
      const savedEntries = await tierEntryRepository.save(newEntries);
      tierList.entries = savedEntries
    } 
  
    await tierListRepository.save(tierList);
    
    res.json({ message: "Tier list updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a tier list
export const deleteTierList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const tierList = await tierListRepository.findOne({
      where: { id, user: { id: user.id } },
      relations: ["entries"]
    });

    if (!tierList) {
      return res.status(404).json({ message: "Tier list not found" });
    }

    // Remove entries first
    await tierEntryRepository.remove(tierList.entries);
    
    // Then remove tier list
    await tierListRepository.remove(tierList);

    res.json({ message: "Tier list deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};