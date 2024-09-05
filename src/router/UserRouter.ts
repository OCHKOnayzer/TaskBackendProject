import { Router } from "express";
import UserController from "../controller/userController";
import ValidationAuthFunction from "../validation/ValidationAuthFunction";
import RegularValidationFunction from "../validation/RegularValidationFunction";
import upload from "../middleware/UploadImageMiddleware";
import base64ImageMiddleware from "../middleware/UploadImageBase64";


const UserRouter = Router();

const controller = UserController

UserRouter.post('/createUsers',ValidationAuthFunction.validateCreateUser,controller.CreateUsers);
UserRouter.post('/loginUser',ValidationAuthFunction.validateLoginUser,controller.LoginUser);
UserRouter.post('/getUsersInfo',RegularValidationFunction.validateUserIdOnly,controller.GetUserInfo);
UserRouter.post('/DellUser',RegularValidationFunction.MethodPermission,controller.DeleteUser);
UserRouter.post('/EditUser',controller.UpdateUsers);
UserRouter.post('/UpdateImageFile',upload.single('images'),controller.UpdateUserImageFile);
UserRouter.post('/UpdateUserImageBase64',base64ImageMiddleware,controller.UpdateImageBase64);
UserRouter.get('/getAllUsers',controller.GetAllUsers);

export default UserRouter;