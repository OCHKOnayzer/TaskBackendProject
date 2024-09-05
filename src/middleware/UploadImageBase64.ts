import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import ApiError from '../apiErrors/ApiErrors';
import { CustomRequestBase64 } from '../types/CustomRequests';

const base64ToImage = (base64String: string, fileName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
        const filePath = path.join(__dirname, 'src/images', fileName);

        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                return reject(err);
            }
            resolve(filePath);
        });
    });
};

const base64ImageMiddleware = async (req: CustomRequestBase64, res: Response, next: NextFunction) => {
    try {
        const { imageBase64 } = req.body;

        if (!imageBase64) {
            return next(ApiError.BadRequest('Нет изображения для загрузки'));
        }

        const fileName = `image-${Date.now()}.jpg`;

        const filePath = await base64ToImage(imageBase64, fileName);

        req.filePath = filePath;

        next();
    } catch (e) {
        next(ApiError.ServerError('Ошибка при загрузке изображения'));
    }
};

export default base64ImageMiddleware;
