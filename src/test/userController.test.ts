// import { Request, Response, NextFunction } from 'express';
// import sinon from 'sinon';
// import chai from 'chai';
// import userController from '../controller/userController';
// import UserService from '../service/userService';
// import ApiErrors from '../apiErrors/ApiErrors';
// const { expect } = chai;

// describe('UserController', () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let next: sinon.SinonSpy;

//   beforeEach(() => {
//     req = {} as Partial<Request>;
//     res = {
//       cookie: sinon.spy(),
//       json: sinon.spy(),
//     } as Partial<Response>;
//     next = sinon.spy();
//   });

//   it('should create a user', async () => {
//     req.body = { username: 'testuser', password: 'password', email: 'test@example.com' };

//     await userController.CreateUsers(req as Request, res as Response, next as NextFunction);

//     expect(res.cookie.calledOnce).to.be.true;
//     expect(res.json.calledWith(sinon.match.object)).to.be.true;
//   });

//   it('should handle missing fields on user creation', async () => {
//     req.body = { username: 'testuser', password: '' }; // Email отсутствует

//     await userController.CreateUsers(req as Request, res as Response, next as NextFunction);

//     expect(next.calledOnce).to.be.true;
//     expect(next.firstCall.args[0]).to.be.instanceOf(ApiErrors.BadRequest);
//   });

//   it('should login a user', async () => {
//     req.body = { username: 'testuser', password: 'password' };

//     await userController.LoginUser(req as Request, res as Response, next as NextFunction);

//     expect(res.cookie.calledOnce).to.be.true;
//     expect(res.json.calledWith(sinon.match.object)).to.be.true;
//   });

//   it('should handle login errors', async () => {
//     req.body = { username: 'testuser', password: '' }

//     await userController.LoginUser(req as Request, res as Response, next as NextFunction);

//     expect(next.calledOnce).to.be.true;
//     expect(next.firstCall.args[0]).to.be.instanceOf(ApiErrors.BadRequest);
//   });

//   it('should get all users', async () => {
//     await userController.GetAllUsers(req as Request, res as Response, next as NextFunction);

//     expect(res.json.calledOnce).to.be.true;
//   });

//   it('should log out a user', async () => {
//     req.body = { refreshToken: 'sampleToken' };

//     await userController.logOut(req as Request, res as Response, next as NextFunction);

//     expect(res.clearCookie.calledOnce).to.be.true;
//     expect(res.json.calledWith(sinon.match.object)).to.be.true;
//   });

//   it('should get user info', async () => {
//     req.body = { userId: 'validUserId' }; // Замените на валидный ObjectId

//     await userController.GetUserInfo(req as Request, res as Response, next as NextFunction);

//     expect(res.json.calledOnce).to.be.true;
//   });

//   it('should handle invalid userId in get user info', async () => {
//     req.body = { userId: 'invalidUserId' };

//     await userController.GetUserInfo(req as Request, res as Response, next as NextFunction);

//     expect(next.calledOnce).to.be.true;
//     expect(next.firstCall.args[0]).to.be.instanceOf(ApiErrors.BadRequest);
//   });

//   it('should delete a user', async () => {
//     req.body = { userId: 'validUserId' }; // Замените на валидный ObjectId

//     await userController.DeleteUser(req as Request, res as Response, next as NextFunction);

//     expect(res.json.calledOnce).to.be.true;
//   });

//   it('should update user data', async () => {
//     req.body = { userId: 'validUserId', username: 'newuser', password: 'newpassword', email: 'new@example.com' }; // Замените на валидный ObjectId

//     await userController.UpdateUsers(req as Request, res as Response, next as NextFunction);

//     expect(res.json.calledOnce).to.be.true;
//   });

//   it('should update user image file', async () => {
//     req.body = { userId: 'validUserId' }; // Замените на валидный ObjectId
//     req.file = { filename: 'image.png' }; // Симулируем файл

//     await userController.UpdateUserImageFile(req as CustomRequestFile, res as Response, next as NextFunction);

//     expect(res.json.calledOnce).to.be.true;
//   });

//   it('should update image base64', async () => {
//     req.body = { userId: 'validUserId', ImagePath: 'base64ImageString' }; // Замените на валидный ObjectId и путь

//     await userController.UpdateImageBase64(req as Request, res as Response, next as NextFunction);

//     expect(res.json.calledOnce).to.be.true;
//   });
// });
