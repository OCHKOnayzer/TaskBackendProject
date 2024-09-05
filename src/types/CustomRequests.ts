import { Request } from 'express';
import { Types } from 'mongoose';

export interface CustomRequestFile extends Request {
    userId?: Types.ObjectId;
    file?: Express.Multer.File; 
}

export interface CustomRequestCheckAuth extends Request {
    userId?: Types.ObjectId;
}
export interface CustomRequestBase64 extends Request { 
    filePath?: string;
}