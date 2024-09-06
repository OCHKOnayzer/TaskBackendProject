import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import userController from '../controller/userController';
import ApiError from '../apiErrors/ApiErrors';
import UserService from '../service/userService';
import userModel from '../model/UserModel';

jest.mock('../service/userService');
jest.mock('../model/UserModel');

describe('UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {} as Partial<Request>;
    res = {
      cookie: jest.fn(),
      json: jest.fn(),
      clearCookie: jest.fn(),
    } as Partial<Response>;
    next = jest.fn();
  });

  it('should create a user', async () => {
    (UserService.registration as jest.Mock).mockResolvedValue({
      refreshToken: 'sampleToken',
    });

    req.body = { username: 'testuser', password: 'password', email: 'test@example.com' };

    await userController.CreateUsers(req as Request, res as Response, next as NextFunction);

    expect(res.cookie).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      refreshToken: 'sampleToken',
    }));
  });

  it('should handle missing fields on user creation', async () => {
    req.body = { username: 'testuser', password: '' };

    await userController.CreateUsers(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
  });

  it('should login a user', async () => {
    (UserService.AuthUser as jest.Mock).mockResolvedValue({
      refreshToken: 'sampleToken',
    });

    req.body = { username: 'testuser', password: 'password' };

    await userController.LoginUser(req as Request, res as Response, next as NextFunction);

    expect(res.cookie).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      refreshToken: 'sampleToken',
    }));
  });

  it('should handle login errors', async () => {
    (UserService.AuthUser as jest.Mock).mockRejectedValue(ApiError.BadRequest('Login failed'));

    req.body = { username: 'testuser', password: '' };

    await userController.LoginUser(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
  });

  it('should get all users', async () => {
    (userModel.find as jest.Mock).mockResolvedValue([{ _id: '1', username: 'testuser' }]);

    await userController.GetAllUsers(req as Request, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([{ _id: '1', username: 'testuser' }]);
  });

  it('should log out a user', async () => {
    (UserService.LogOutUser as jest.Mock).mockResolvedValue({});

    req.body = { refreshToken: 'sampleToken' };

    await userController.logOut(req as Request, res as Response, next as NextFunction);

    expect(res.clearCookie).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should get user info', async () => {
    const fakeId = new ObjectId().toString();
    (UserService.InfoUser as jest.Mock).mockResolvedValue({ _id: fakeId, username: 'testuser' });

    req.body = { userId: fakeId };

    await userController.GetUserInfo(req as Request, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ _id: fakeId, username: 'testuser' });
  });

  it('should handle invalid userId in get user info', async () => {
    (UserService.InfoUser as jest.Mock).mockRejectedValue(ApiError.BadRequest('Invalid userId'));

    req.body = { userId: 'invalidUserId' };

    await userController.GetUserInfo(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
  });

  it('should delete a user', async () => {
    const fakeId = new ObjectId().toString();
    (UserService.DeleteUser as jest.Mock).mockResolvedValue({ message: 'User deleted' });

    req.body = { userId: fakeId };

    await userController.DeleteUser(req as Request, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'User deleted' });
  });

  it('should update user data', async () => {
    const fakeId = new ObjectId().toString();
    (UserService.UpdateUserData as jest.Mock).mockResolvedValue({});

    req.body = { userId: fakeId, username: 'newuser', password: 'newpassword', email: 'new@example.com' };

    await userController.UpdateUsers(req as Request, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should update image file', async () => {
    const fakeId = new ObjectId().toString();
    (UserService.UpdateImageFile as jest.Mock).mockResolvedValue({});

    req.body = { userId: fakeId };
    req.file = {
      fieldname: 'file',
      originalname: 'image.png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: Buffer.from(''),
      size: 0,
    } as any;

    await userController.UpdateUserImageFile(req as any, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should update image base64', async () => {
    const fakeId = new ObjectId().toString();
    (UserService.UpdateImageBase64 as jest.Mock).mockResolvedValue({});

    req.body = { userId: fakeId, ImagePath: 'base64ImageString' };

    await userController.UpdateImageBase64(req as Request, res as Response, next as NextFunction);

    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
