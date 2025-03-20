import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';
import { RequestedUser } from 'src/auth/types/auth.type';

@Controller('tasks')
@ApiTags('Task')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @ApiOperation({
    description: 'create task',
    summary: 'create task',
  })
  @ApiOkResponse({
    // schema:
  })
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Post('create')
  async createTask(
    @Body() createTaskData: CreateTaskDto,
    @Req() req: RequestedUser,
  ) {
    return await this.taskService.createTask(createTaskData, req.user);
  }

  @ApiOperation({
    description: 'update task',
    summary: 'update task',
  })
  @ApiCreatedResponse({})
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiParam({
    name: 'taskId',
    type: Number,
    required: true,
  })
  @Put(':taskId')
  async updateTask(
    @Req() req: RequestedUser,
    @Body() updateData: UpdateTaskDto,
    @Param('taskId') taskId: string,
  ) {
    return await this.taskService.editTask(+taskId, updateData, req.user);
  }

  @ApiOperation({
    description: 'get all tasks',
    summary: 'get all tasks',
  })
  @ApiOkResponse({})
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get('/all-tasks')
  async getAllTasks(@Req() req: RequestedUser) {
    console.log(req.user);
    return await this.taskService.getAllTasks(req.user);
  }

  @ApiOperation({
    description: 'get task detail',
    summary: 'get task detail',
  })
  @ApiOkResponse({})
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiParam({
    name: 'taskId',
    type: Number,
    required: true,
  })
  @Get('/:taskId')
  async getTask(@Req() req: RequestedUser, @Param('taskId') taskId: string) {
    return await this.taskService.getTask(+taskId, req.user);
  }

  @ApiOperation({
    description: 'delete task',
    summary: 'delete task',
  })
  @ApiOkResponse({})
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Delete(':taskId')
  async deleteTask(@Req() req: RequestedUser, @Param('taskId') taskId: string) {
    await this.taskService.deleteTask(+taskId, req.user);
  }
}
