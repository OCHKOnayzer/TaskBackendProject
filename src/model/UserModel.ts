import mongoose,{ Schema,model,Document,Types } from "mongoose";

interface IUser extends Document { 
    _id:Types.ObjectId
    username: string;
    password: string;
    email: string;
    avatar:string
};

const UserScheme:Schema = new Schema({
    username:{type:String,required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    avatar:{type:String,default:'../images/default.jpg'},
    permission:{type:Number,default:0}
});

const userModel =  model<IUser>('User', UserScheme);
export default userModel;