import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Put, Delete, Headers } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InputCreateMainTask, InputCreateSubTask, TaskService } from "./task.service";
import { UpdateTaskDTO } from "./dto/updatedTaskDto";
import { CreateTaskDTO } from "./dto/createTaskDTO";

export type InputCreateMainTaskDTO = Omit<InputCreateMainTask, 'document'>;
export type InputCreateSubTaskDTO = Omit<InputCreateSubTask, 'document'>;
@ApiTags("Tasks") 
@ApiBearerAuth() 
@Controller("tasks")
export class TaskController {
  constructor(readonly taskService: TaskService) {}

  @ApiOperation({
    summary: "Create a task",
    description: "Cria uma nova tarefa com um documento opcional anexado. Requer autenticação com Bearer Token.",
  })
  @ApiConsumes("multipart/form-data") 
  @ApiResponse({
    status: 201,
    description: "Tarefa criada com sucesso.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação inválido ou ausente.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro interno do servidor.",
  })
  @Post("create")
  @UseInterceptors(FileInterceptor("document"))
  async createTask(
    @Body() input: InputCreateMainTaskDTO,
    @UploadedFile() document: Express.Multer.File,
    @Headers() token: any
  ) {
    return await this.taskService.createMainTask({
      ...input,
      token: token.authorization,
      document: document?.buffer
    });
  }

  @Post("create/subtask")
  @UseInterceptors(FileInterceptor("document"))
  async createSubTask(
    @Body() input: InputCreateSubTaskDTO,
    @UploadedFile() document: Express.Multer.File,
    @Headers() token: any
  ) {
    return await this.taskService.createSubTask({
      ...input,
      token: token.authorization,
      document: document?.buffer
    });
  }


  @ApiOperation({
    summary: "Get all tasks",
    description: "Retorna todas as tarefas do usuário autenticado.",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de tarefas retornada com sucesso.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação inválido ou ausente.",
  })
  @Get()
  async getAllTasks() {
    //return await this.taskService.findAll();
  }

  @ApiOperation({
    summary: "Get grouped tasks",
    description: "Retorna as tarefas agrupadas por categorias.",
  })
  @ApiResponse({
    status: 200,
    description: "Tarefas agrupadas retornadas com sucesso.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação inválido ou ausente.",
  })
  @Get("group")
  async getGroup() {
    //return await this.taskService.getGroupedTasks();
  }

  @ApiOperation({
    summary: "Delete a task",
    description: "Deleta uma tarefa específica do usuário autenticado.",
  })
  @ApiResponse({
    status: 200,
    description: "Tarefa deletada com sucesso.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação inválido ou ausente.",
  })
  @Delete()
  async deleteTask(@Body() input: { taskId: string }) {
    //return await this.taskService.delete(input.taskId);
  }

  @ApiOperation({
    summary: "Update a task",
    description: "Atualiza os detalhes de uma tarefa específica.",
  })
  @ApiResponse({
    status: 200,
    description: "Tarefa atualizada com sucesso.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação inválido ou ausente.",
  })
  @Put()
  async updateTask(@Body() input: UpdateTaskDTO) {
    //return await this.taskService.update(input.taskId, input.updates);
  }
}
