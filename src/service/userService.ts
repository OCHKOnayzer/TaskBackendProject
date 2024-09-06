import userModel from "../model/UserModel";
import bcrypt from "bcryptjs";
import userDTO from "../dtos/userDTO";
import { generationTokens } from "../tokens/tokenService";
import { saveToken } from "../tokens/tokenService";
import { Types } from "mongoose";
import ApiError from "../apiErrors/ApiErrors";
import TaskModel from "../model/TaskModel";
import multer from 'multer';

interface ReturnItem {
    userdto: InstanceType<typeof userDTO>;
    accessToken: string;
    refreshToken: string;
}

type UserDto = { 
    _id: Types.ObjectId;
    email: string;
    username: string;
    password: string;
}

class UserService {
    static async registration(username: string, email: string, password: string): Promise<ReturnItem> {
        try {
            const UnicName = await userModel.findOne({ username });
            const UnicEmail = await userModel.findOne({ email });

            if (UnicName) {
                throw ApiError.BadRequest(`Пользователь ${username} уже существует`);
            }
            if (UnicEmail) {
                throw ApiError.BadRequest(`Почта ${email} уже существует`);
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({ username, email, password: hashPassword });
            await newUser.save();

            const userdto = new userDTO(newUser);
            const tokens = generationTokens({ ...userdto });
            const returnItem: ReturnItem = {
                ...tokens,
                userdto,
            };

            return returnItem;
        } catch (error:any) {
            throw error;
        }
    }

    static async AuthUser(username: string, password: string): Promise<ReturnItem> {

        try{ 
            const AuthUser = await userModel.findOne({ username });

            if (!AuthUser) {
                throw ApiError.BadRequest(`Пользователь ${username} не найден`);
            }

            const validPass = await bcrypt.compare(password,AuthUser.password);

            if(!validPass){ 
                throw ApiError.BadRequest(`Неверный пароль от ${username}`);
            }

            const userdto = new userDTO(AuthUser);
            const tokens = generationTokens({ ...userdto });

            await saveToken(userdto._id,tokens.refreshToken);

            const returnItem: ReturnItem = {
                ...tokens,
                userdto,
            };

            return returnItem
        }catch(e:any){ 
            throw e
        }

    }

    static async InfoUser(Userid:Types.ObjectId){ 
        try{ 

            const FindUser = await userModel.findById(Userid);

            if(!FindUser){ 
                throw ApiError.BadRequest('Пользователь не найден');
            };

            const CountUsersTask = await TaskModel.countDocuments(Userid);

            const returnItems = { 
                FindUser,
                CountUsersTask
            }

            return returnItems

        }catch(e:any){ 
            
        }
    }

    static async DeleteUser(UserId: Types.ObjectId) {
        try {
           
            const FindUser = await userModel.findById(UserId);

            if (!FindUser) {
                throw ApiError.BadRequest('Пользователь не найден'); 
            }

            const result = await userModel.deleteOne({ _id: UserId });

            
            if (result.deletedCount === 0) {
                throw ApiError.ServerError('Ошибка при удалении пользователя');
            }

            
            return { message: 'Пользователь успешно удален' };
        } catch (e: any) {
            
            throw e; 
        }
    }

    static async UpdateUserData(UserId: Types.ObjectId, username: string, password: string, email: string) { 
        try { 
            const FindUser = await userModel.findById(UserId);
            if (!FindUser) {
                throw ApiError.BadRequest('Пользователь не найден'); 
            } 
    
            let shouldUpdateToken = false;
    
            if(username){ 

                if (FindUser.username !== username) { 
                    FindUser.username = username;
                    shouldUpdateToken = true;
                }

                const FindUserUnic = await userModel.findOne({username:username})

                if(FindUserUnic){ 
                    throw ApiError.BadRequest(`Пользователь ${username} уже существует`);
                }
            }


            if(email){ 
                if (FindUser.email !== email) { 
                    FindUser.email = email;
                    shouldUpdateToken = true;
                }

                const FindEamilUnic = await userModel.findOne({email:email})

                if(FindEamilUnic){ 
                    throw ApiError.BadRequest(`Почта ${email} уже существует`);
                }
            }
    
            if (password) {
                const hashPassword = await bcrypt.hash(password, 10);
                FindUser.password = hashPassword;
                shouldUpdateToken = true;
            }

            await FindUser.save();
            
            let tokens: { accessToken: string; refreshToken: string } = { accessToken: '', refreshToken: '' };
           
            let userdto: UserDto = { _id: FindUser._id, email: FindUser.email, username: FindUser.username,password:FindUser.password };
    
            if (shouldUpdateToken) {
                
                tokens = generationTokens({ ...userdto });
            }
    
            const returnItem: ReturnItem = {
                ...tokens,
                userdto,
            };
    
            return returnItem;
    
        } catch (e: any) { 
            throw e;
        }
    }
    
    

    static async LogOutUser(refreshToken:string){ 
        try{ 



        }catch(e:any){ 
            throw e
        }
    }

    static async UpdateImageFile(userId: Types.ObjectId, imageFilename: string) {
        try {

            const FindUser = await userModel.findById(userId);

            if (!FindUser) {
                throw ApiError.BadRequest('Пользователь не найден');
            }

            FindUser.avatar = `../images/${imageFilename}`;
            await FindUser.save();

            return FindUser;

        } catch (e: any) {
            throw e;
        }
    }


    static async UpdateImageBase64(userId:Types.ObjectId,imageBase64:string){ 
    
        try{ 

            const FindUser = await userModel.findById(userId);

            if (!FindUser) {
                throw ApiError.BadRequest('Пользователь не найден');
            }            

            FindUser.avatar = `../images/${imageBase64}`;;

            await FindUser.save();

            return FindUser;

        }catch(e:any){ 
            throw e;
        }

    }

}

export default UserService