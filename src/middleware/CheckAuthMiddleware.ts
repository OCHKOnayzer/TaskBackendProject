import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../apiErrors/ApiErrors';
import { Types } from 'mongoose';
import { CustomRequestCheckAuth } from '../types/CustomRequests';


const authMiddleware = (req: CustomRequestCheckAuth, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(ApiError.UnauthorizedError());
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next(ApiError.UnauthorizedError());
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESSTOKEN as string) as JwtPayload;

        if (decoded && typeof decoded === 'object' && '_id' in decoded) {
            req.userId = new Types.ObjectId(decoded._id as string);
            next();
        } else {
            return next(ApiError.UnauthorizedError());
        }
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};

export default authMiddleware;
