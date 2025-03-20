import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';
import { ValidatedUser } from 'src/auth/types/auth.type';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(
    taskData: CreateTaskDto,
    user: ValidatedUser,
  ): Promise<Task> {
    try {
      return await this.prismaService.task.create({
        data: { ...taskData, userId: user.id },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getTask(taskId: number, user: ValidatedUser): Promise<Task> {
    try {
      return await this.prismaService.task.findUniqueOrThrow({
        where: { id: taskId, userId: user.id },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAllTasks(user: ValidatedUser): Promise<Task[]> {
    // try {
      console.log("+++")
      return await this.prismaService.task.findMany({
        where: { userId: user.id },
      });
    // } catch (error) {
      // throw new BadRequestException(error);
    // }
  }

  async editTask(
    taskId: number,
    taskData: UpdateTaskDto,
    user: ValidatedUser,
  ): Promise<Task> {
    try {
      return await this.prismaService.task.update({
        where: { id: taskId, userId: user.id },
        data: { ...taskData },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteTask(taskId: number, user: ValidatedUser): Promise<void> {
    try {
      await this.prismaService.task.delete({
        where: {
          userId: user.id,
          id: taskId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
