import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Put, Delete, Headers, Param, Header, Query } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InputCreateMainTask, InputCreateSubTask, TaskService } from "./task.service";
import { UpdateTaskDTO } from "./dto/updatedTaskDto";
import { MainTask } from "./main-task";

export type InputCreateMainTaskDTO = Omit<InputCreateMainTask, 'document'>;
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
    description: "Erro na valida��o dos dados.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autentica��o inv�lido ou ausente.",
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
    description: "Erro na valida��o dos dados.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autentica��o inv�lido ou ausente.",
  })
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
    description: "Retorna todas as tarefas do usu�rio autenticado.",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de tarefas retornada com sucesso.",
    type: [MainTask]
  })
  @ApiResponse({
    status: 401,
    description: "Token de autentica��o inv�lido ou ausente.",
  })
  @Get("getall")
  async getAllTasks(@Headers() token: {authorization: string}) {
    return await this.taskService.getAll(token.authorization);
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
    status: 400,
    description: "Erro na valida��o dos par�metros.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autentica��o inv�lido ou ausente.",
  })
  @Get("getFilteredTasks")
  async getFilteredTasks(@Query() params : {type: string, value: string}, @Headers() token: {authorization: string}) {
    return await this.taskService.findByGroup(params.type, params.value, token.authorization);
  }

  @ApiOperation({
    summary: "Delete a task",
    description: "Deleta uma tarefa espec�fica do usu�rio autenticado.",
  })
  @ApiResponse({
    status: 200,
    description: "Tarefa deletada com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description: "Erro na valida��o dos dados.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autentica��o inv�lido ou ausente.",
  })
  @Delete("delete")
  async deleteTask(@Body() input, @Headers() token: {authorization: string}) {
    return await this.taskService.delete(input.id, token.authorization);
  }

  @ApiOperation({
    summary: "Update a task",
    description: "Atualiza os detalhes de uma tarefa espec�fica.",
  })
  @ApiConsumes("multipart/form-data") 
  @ApiResponse({
    status: 200,
    description: "Tarefa atualizada com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description: "Erro na valida��o dos dados.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autentica��o inv�lido ou ausente.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro interno do servidor.",
  })
  @Put("update")
  @UseInterceptors(FileInterceptor("document"))
  async updateTask(@Body() input: UpdateTaskDTO, @Headers() token: any, @UploadedFile() document: Express.Multer.File) {
    return await this.taskService.update({...input, document: document?.buffer}, token.authorization);
  }
}
