import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { AppDataSource } from "../config/database";
import { TierList } from "../entity/TierList"; // Make sure to import TierList entity

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if this is a tierList GET request by pattern /:idOrCode
    const isTierListGetRequest = 
      req.method === 'GET' && 
      req.path.match(/^\/[a-zA-Z0-9_-]+$/) !== null;
    
    // If it's a tier list request, extract the idOrCode
    let isPublicTierList = false;
    if (isTierListGetRequest) {
      const idOrCode = req.path.substring(1); // Remove the leading slash
      const tierListRepository = AppDataSource.getRepository(TierList);
      
      // Try to find tier list by ID or code
      const tierList = await tierListRepository.findOne({
        where: [
          { shareCode: idOrCode }
        ]
      });
      
      // Check if tier list exists and is public
      isPublicTierList = tierList?.isPublic === true;
    }
    
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      // If it's a public tier list, allow access without authentication
      if (isPublicTierList) {
        return next();
      }
      return res.status(401).json({ message: "Authentication required" });
    }

    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.id } });
    
    if (!user) {
      // If it's a public tier list, allow access even if token is invalid
      if (isPublicTierList) {
        return next();
      }
      return res.status(401).json({ message: "Authentication required" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    // If there's an error with token verification but it's a public tier list, allow
    if (req.method === 'GET' && req.path.match(/^\/[a-zA-Z0-9_-]+$/) !== null) {
      try {
        const idOrCode = req.path.substring(1);
        const tierListRepository = AppDataSource.getRepository(TierList);
        const tierList = await tierListRepository.findOne({
          where: [
            { shareCode: idOrCode }
          ]
        });
        
        if (tierList?.isPublic === true) {
          return next();
        }
      } catch (innerError) {
        // Ignore inner error, fall through to authentication required
      }
    }
    res.status(401).json({ message: "Authentication required" });
  }
};