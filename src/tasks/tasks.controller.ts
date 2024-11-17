import { CreateTaskDTO } from "./dto/createTaskDTO";
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Put,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";
import { TaskService } from "./task.service";
import { Public } from "@/auth/constants";

@Controller("tasks")
export class TaskController {
   constructor(readonly taskService:TaskService){}
    
   //@Public()// so pra testear
  @Post("create")
  @UseInterceptors(FileInterceptor("document"))
  @ApiConsumes("multipart/form-data")
  async createTask(
    @Body() input: {email:string},
    @UploadedFile() document: Express.Multer.File,
  ) {
    console.log("eee")
    return await this.taskService.create({email:input.email})
  }

  @Get()
  getAllTasks () {}

  @Get()
  getGroup () {}

  @Delete()
  deleteTask() {}

  @Put()
  updatedTask() {}
}
