import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Put, Delete, Headers, Param, Header, Query } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InputCreateMainTask, InputCreateSubTask, TaskService } from "./task.service";
import { UpdateTaskDTO } from "./dto/updatedTaskDto";
import { MainTask } from "./main-task";
import { CreateTaskDTO } from "./dto/createTaskDTO";
import { GetFilteredDto } from "./dto/getFilteredDto";
import { CreateSubTaskDTO } from "./dto/createSubTaskDTO";
import { DeleteTaskDto } from "./dto/deleteTaskDto";
import {  GetAuthorization } from "./dto/getAllTaskDTO";
import { Task } from "./task";
import { ResponseTask } from "./dto/responseTask.dto";

// export type InputCreateMainTaskDTO = Omit<InputCreateMainTask, 'document'>;
export type InputCreateSubTaskDTO = Omit<InputCreateSubTask, 'document'>;

@ApiTags("Tasks") 
@ApiBearerAuth() 
@Controller("tasks")
export class TaskController {
  constructor(readonly taskService: TaskService) {}

  @ApiOperation({
    summary: "Create a task",
    description: "Cria uma nova tarefa com um documento opcional anexado. Requer autentica��o com Bearer Token.",
  })
  @ApiConsumes("multipart/form-data") 
  @ApiResponse({
    status: 201,
    description: "Tarefa criada com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description: "Erro na validação dos dados.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação invalido ou ausente.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro interno do servidor.",
  })
  @Post("create")
  @UseInterceptors(FileInterceptor("document"))
  async createTask(
    @Body() input: CreateTaskDTO,
    @UploadedFile() document: Express.Multer.File,
    @Headers() token: GetAuthorization
  ) {
    return await this.taskService.createMainTask({
      ...input,
      token: token.authorization,
      document: document?.buffer
    });
  }

  @ApiOperation({
    summary: "Create a subtask",
    description: "Cria uma subtarefa vinculada a uma tarefa principal.",
  })
  @ApiConsumes("multipart/form-data") 
  @ApiResponse({
    status: 201,
    description: "Subtarefa criada com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description: "Erro na validalido dos dados.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação invalido ou ausente.",
  })
  @Post("create/subtask")
  @UseInterceptors(FileInterceptor("document"))
  async createSubTask(
    @Body() input: CreateSubTaskDTO,
    @UploadedFile() document: Express.Multer.File,
    @Headers() token: GetAuthorization
  ) {
    return await this.taskService.createSubTask({
      ...input,
      token: token.authorization,
      document: document?.buffer
    });
  }

  @ApiOperation({
    summary: "Get all tasks",
    description: "Retorna todas as tarefas do usuario autenticado.",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de tarefas retornada com sucesso.",
    type: [ResponseTask]
  })
  
  @ApiResponse({
    status: 401,
    description: "Token de autenticao invalido ou ausente.",
  })
  @Get("getall")
  async getAllTasks(@Headers() token: GetAuthorization) {
    return await this.taskService.getAll(token.authorization);
  }

  @ApiOperation({
    summary: "Get grouped tasks",
    description: "Retorna as tarefas agrupadas por categorias. ",
  })
  @ApiResponse({
    status: 200,
    description: "Tarefas agrupadas retornadas com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description: "Erro na validaçãoo dos parametros.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação invalido ou ausente.",
  })
  @Get("getFilteredTasks")
  async getFilteredTasks(@Query() params : GetFilteredDto, @Headers() token: GetAuthorization) {
    return await this.taskService.findByGroup(params.type, params.value, token.authorization);
  }

  @ApiOperation({
    summary: "Delete a task",
    description: "Deleta uma tarefa especefica do usuario autenticado.",
  })
  @ApiResponse({
    status: 200,
    description: "Tarefa deletada com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description: "Erro na validaçãoo dos dados.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticaçãoo invalido ou ausente.",
  })
  @Delete("delete")
  async deleteTask(@Body() input: DeleteTaskDto, @Headers() token: GetAuthorization) {
    return await this.taskService.delete(input.id, token.authorization);
  }

  @ApiOperation({
    summary: "Update a task",
    description: "Atualiza os detalhes de uma tarefa especifica.",
  })
  @ApiConsumes("multipart/form-data") 
  @ApiResponse({
    status: 200,
    description: "Tarefa atualizada com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description: "Erro na validação dos dados.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação invalido ou ausente.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro interno do servidor.",
  })
  @Put("update")
  @UseInterceptors(FileInterceptor("document"))
  async updateTask(@Body() input: UpdateTaskDTO, @Headers() token: GetAuthorization, @UploadedFile() document: Express.Multer.File) {
    return await this.taskService.update({...input, document: document?.buffer}, token.authorization);
  }
}
