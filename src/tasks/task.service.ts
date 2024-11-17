import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AccountRepository } from "@/account/account-respository";
import { TaskRepository } from "./task-repository";
import { MainTask } from "./main-task";
import { SubTask } from "./sub-task";

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
    const account = await this.accountRepository.findById(account_id);
    if (!account) throw new BadRequestException("Account not found");
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
    const account_id = await this.auth.decoded(input.token);
    const account = await this.accountRepository.findById(account_id);
    if (!account) throw new BadRequestException("Account not found");
    const main_task_parent = await this.taskRepository.findMainTaskById(
      input.owner_task_id,
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

  async getAll() {
    console.log(this.task);
  }

  async findByGroup() {}

  async update() {}
  async delete() {}
}
