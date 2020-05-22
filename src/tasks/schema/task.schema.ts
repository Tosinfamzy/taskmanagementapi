
import { Schema } from 'mongoose';
import { TaskStatus } from '../interfaces/task-status';

export const TaskSchema = new Schema({
    title: { type: String, required: [true, 'Title is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    status: { type: TaskStatus, required: [true, 'Status is requried'] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
