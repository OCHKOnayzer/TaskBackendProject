import { Types, Document } from 'mongoose';

interface IUser extends Document {
    _id: Types.ObjectId;
    email: string;
    username: string;
    password: string;
}

class userDTO { 
    _id: Types.ObjectId;
    email: string;
    username:string;
    password:string
    constructor(model: Document<unknown, {}, IUser> & IUser) { 
        this._id = model._id as Types.ObjectId;
        this.email = model.email;
        this.username = model.username;
        this.password = model.password
    }
}

export default userDTO;
