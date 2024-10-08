import { Types, Document } from 'mongoose';

interface TaskType extends Document {
    _id: Types.ObjectId;
    titleTask: string;
    taskBody: string;
    userId: Types.ObjectId;
}

class TaskDTO {
    _id: Types.ObjectId;
    titleTask: string;
    taskBody: string;
    userId: Types.ObjectId;

    constructor(model: TaskType) {
        this._id = model._id;
        this.titleTask = model.titleTask;
        this.taskBody = model.taskBody;
        this.userId = model.userId;
    }
}

export default TaskDTO;
