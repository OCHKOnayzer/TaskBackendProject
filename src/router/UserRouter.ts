import { Router } from "express";
import UserController from "../controller/userController";
import ValidationAuthFunction from "../validation/ValidationAuthFunction";
import RegularValidationFunction from "../validation/RegularValidationFunction";
import upload from "../middleware/UploadImageMiddleware";


const UserRouter = Router();

const controller = UserController

UserRouter.post('/createUsers',ValidationAuthFunction.validateCreateUser,controller.CreateUsers);
UserRouter.post('/loginUser',ValidationAuthFunction.validateLoginUser,controller.LoginUser);
UserRouter.post('/getUsersInfo',RegularValidationFunction.validateUserIdOnly,controller.GetUserInfo);
UserRouter.post('/DellUser',RegularValidationFunction.MethodPermission,controller.DeleteUser);
UserRouter.post('/EditUser',ValidationAuthFunction.validateUpdateUser,controller.UpdateUsers);
UserRouter.post('/UpdateImageFile',upload.single('images'),controller.UpdateUserImageFile);
UserRouter.get('/getAllUsers',controller.GetAllUsers);

export default UserRouter;