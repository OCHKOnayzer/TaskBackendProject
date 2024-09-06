import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../apiErrors/ApiErrors';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    
    const UserId = req.body.userId;

    const token = authHeader?.split(' ')[1]?.trim().replace(/["']$/, '');
    
    console.log(token);
    
    if (!token) {
        return next(ApiError.UnauthorizedError());
    }

    try {
       
        const decoded = jwt.decode(token) as { _id: string };

        console.log(decoded)

        if (!decoded || !decoded._id) {
            return res.status(401).json({ message: 'Неверный токен' });
        }

        const tokenId = decoded._id

        // console.log(UserId)
        // console.log(tokenId)

        if (tokenId !== UserId) {
            return res.status(403).json({ message: 'Вы не авторизованны' });
        }

        next();
    } catch (error) {
        next(ApiError.UnauthorizedError());
    }
};

export default authMiddleware;
