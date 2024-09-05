import mongoose,{ Schema,model,Document,Types } from "mongoose";

interface TasksInterafce extends Document { 
    _id:Types.ObjectId
    titleTask: string;
    bodyTask: string;
    userId:Types.ObjectId
};

const TaskScheme:Schema = new Schema({
    titleTask:{type:String, required:true},
    bodyTask:{type:String, required:true},
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

const TaskModel =  model<TasksInterafce>('Tasks', TaskScheme);
export default TaskModel;