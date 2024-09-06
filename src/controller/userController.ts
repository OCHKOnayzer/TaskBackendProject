import { Request, Response, NextFunction } from 'express';
import UserService from '../service/userService';
import { Types } from "mongoose";
import userModel from '../model/UserModel';
import ApiError from '../apiErrors/ApiErrors';
import { CustomRequestFile } from '../types/CustomRequests';

interface CreateUserType {
    username: string;
    password: string;
    email?: string;
}
interface UpdateImage{ 
    userId: Types.ObjectId
    image:string;
}

class UserController {
    static async CreateUsers(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);

        try {
            const { username, password, email }: CreateUserType = req.body;

            if (!username || !password || !email) {
                throw ApiError.BadRequest('Все поля обязательны');
            }

            const UserData = await UserService.registration(username, email, password);

            if (UserData.refreshToken) {
                res.cookie('refreshToken', UserData.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
            } else {
                throw ApiError.BadRequest('Все поля обязательны');
            }

            return res.json(UserData);
        } catch (e: any) {
            next(e);
        }
    }
    static async LoginUser(req:Request,res:Response,next:NextFunction){ 
        try{ 

            const { username,password }:CreateUserType = req.body;

            const UserData = await UserService.AuthUser(username,password);

            if ((await UserData).refreshToken) {
                res.cookie('refreshToken', (await UserData).refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true, 
                });
            } else {
                throw ApiError.BadRequest('Все поля обязательны');
            }
            
            return res.json(UserData)

        }catch(e: any){ 
            next(e);
        }
    }

    static async GetAllUsers(req:Request,res:Response,next:NextFunction){ 

        try{ 

            const allUsers = await userModel.find()

            return res.json(allUsers);

        }catch(e:any){ 
            next(e);
        }

    }
    static async logOut(req:Request,res:Response,next:NextFunction){ 
        try{ 

            const { refreshToken } = req.body
            const UserData = await UserService.LogOutUser(refreshToken);
            res.clearCookie('refreshToken')
            return res.json(UserData);

        }catch(e:any){ 
            next(e);
        }
    }

    static async GetUserInfo(req:Request,res:Response,next:NextFunction){ 

        try{ 

            const { userId } = req.body;

            if (!Types.ObjectId.isValid(userId)) {
                throw ApiError.BadRequest('Неверный формат UserId');
            }

            const UserData = await UserService.InfoUser(userId);

            return res.json(UserData)

        }catch(e){ 
            next(e)
        }
    }

    static async DeleteUser(req:Request,res:Response,next:NextFunction){
        
        try{ 

            const { userId } = req.body;

            if (!Types.ObjectId.isValid(userId)) {
                throw ApiError.BadRequest('Неверный формат UserId');
            }

            const UserData = await UserService.DeleteUser(userId);

            return res.json(UserData);

        }catch(e){ 
            next(e)
        }

    }

    static async UpdateUsers(req:Request,res:Response,next:NextFunction){ 

        try{ 

            const { userId,username,password,email } = req.body;

            const UserData = await UserService.UpdateUserData(userId,username,password,email)

            return res.json(UserData);

        }catch(e){ 
            next(e);
        }

    }

    static async UpdateUserImageFile (req:CustomRequestFile,res:Response,next:NextFunction){ 
        try {
            const userId = req.body.userId;
            const imageFile = req.file;

            if (!imageFile) {
                throw ApiError.BadRequest('Файл изображения обязателен');
            }

            const userData = await UserService.UpdateImageFile(userId, imageFile.filename);

            return res.json(userData);

        } catch (e: any) {
            next(e);
        }
    }

    static async UpdateImageBase64(req:Request,res:Response,next:NextFunction){ 
        try{ 

            const {userId,ImagePath} = req.body;

            const UserData = await UserService.UpdateImageBase64(userId,ImagePath);

            return res.json(UserData);

        }catch(e){ 
            next(e);
        }
    }

}

export default UserController;