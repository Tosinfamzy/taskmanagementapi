import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema },
    ]),
    AuthModule,
  ],
})
export class TasksModule { }
