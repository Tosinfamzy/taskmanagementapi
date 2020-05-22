import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';
import { TaskStatus } from '../interfaces/task-status';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
