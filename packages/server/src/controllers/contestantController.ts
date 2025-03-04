import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Contestant } from "../entity/Contestant";
import { Stage } from "../types/Stage";

const contestantRepository = AppDataSource.getRepository(Contestant);

// Get all contestants
export const getAllContestants = async (req: Request, res: Response) => {
  try {
    const year = req.query.year ? parseInt(req.query.year as string) : 2025;
    const stage = req.query.stage as string;
    
    let whereCondition: any = { year };
    
    // Filter by stage if specified
    if (stage) {
      switch (stage) {
        case Stage.FIRST_SEMI:
          whereCondition.inFirstSemiFinal = true;
          break;
        case Stage.SECOND_SEMI:
          whereCondition.inSecondSemiFinal = true;
          break;
        case Stage.GRAND_FINAL:
          whereCondition.inGrandFinal = true;
          break;
      }
    }
    
    const contestants = await contestantRepository.find({
      where: whereCondition,
    });
    
    res.json(contestants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get contestant by ID
export const getContestantById = async (req: Request, res: Response) => {
  try {
    const contestant = await contestantRepository.findOne({
      where: { id: req.params.id }
    });
    
    if (!contestant) {
      return res.status(404).json({ message: "Contestant not found" });
    }
    
    res.json(contestant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};