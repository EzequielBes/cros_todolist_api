import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AccountRepository } from "@/account/account-respository";
import { TaskRepository } from "./task-repository";
import { MainTask } from "./main-task";
import { SubTask } from "./sub-task";
import { Task } from "./task";
import { UpdateTaskDTO } from "./dto/updatedTaskDto";
import { Account } from "@/account/account";


export type InputCreateMainTask = {
  token: string;
  name: string;
  description: string;
  document?: any;
  tag: string;
};

export type InputCreateSubTask = {
  owner_task_id: string;
} & InputCreateMainTask;

@Injectable()
export class TaskService {
  task = [];
  constructor(
    readonly accountRepository: AccountRepository,
    readonly taskRepository: TaskRepository,
    private auth: AuthService,
  ) {}

  async createMainTask(input: InputCreateMainTask): Promise<void> {
    const account_id = await this.auth.decoded(input.token);
    const task = new MainTask(
      account_id,
      input.name,
      input.description,
      input.tag,
      input.document,
    );
    await this.taskRepository.create(task);
  }

  async createSubTask(input: InputCreateSubTask): Promise<void> {
    if (!input.owner_task_id)
      throw new BadRequestException("Owner_task_id is required");
    const id = await this.auth.decoded(input.token)
    const main_task_parent = await this.taskRepository.findMainTaskById(
      input.owner_task_id,
      id
    );
    const parent_task_parent = await this.taskRepository.findSubTaskById(
      input.owner_task_id,
    );
    if (main_task_parent) {
      const task = new SubTask(
        input.name,
        input.description,
        input.tag,
        input.document,
        main_task_parent.id,
      );
      await this.taskRepository.create(task);
    } else {
      const task = new SubTask(
        input.name,
        input.description,
        input.tag,
        input.document,
        null,
        parent_task_parent.id,
      );
      await this.taskRepository.create(task);
    }
  }

  async getAll(tokenId :string) {
    const id = await this.auth.decoded(tokenId)
    return await this.taskRepository.findAllTasks(id)
  }

  async findByGroup(typeSearch:string, value:string,tokenId:string) {
    const id = await this.auth.decoded(tokenId)
    if(typeSearch === "tag") {
      return await this.taskRepository.findByTag(value)
    }
    if(typeSearch === "status") {
      return await this.taskRepository.findTaskByStatus(value === "true" ? true:false)
    }
  }

  async update(input:UpdateTaskDTO, token:string) {
    const id = await this.auth.decoded(token)
    const task = await this.taskRepository.findTaskById(input.task_id, id)
    if(!task) throw new NotFoundException('task not found')
    const updatedTask = task.update({description:input.description,document:input.document,name:input.name,status:input.status,tag:input.tag})
    return await this.taskRepository.update(updatedTask)
  }
  
  async delete(id:string, token:string) {
    const decodedId = await this.auth.decoded(token)
    await this.taskRepository.delete(id,decodedId)
  }

}
