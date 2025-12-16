import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];  

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access forbidden: Admins only" });
    }

 
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { verifyAdminRole };
