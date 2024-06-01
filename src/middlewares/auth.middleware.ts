import { NextFunction } from "express"
import { Request, Response } from "express"
import { verifyToken } from "../utils/jwt.utils";


export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Middleware to check if user is authenticated'
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is required"
        });
    }

      try {
        const user = verifyToken(token);
        req.body.user = user;
        next();
        } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    };    
}