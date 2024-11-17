import {
  Injectable,
} from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { MainTask, Task } from "./task";
import { AccountRepository } from "@/account/account-respository";
import { TaskRepository } from "./task-repository";


@Injectable()
export class TaskService {
    task = []
  constructor(readonly accountRepository:AccountRepository, readonly taskRepository:TaskRepository) {}

  async create(input:{email: string}): Promise<void> {
    const account = await this.accountRepository.findByEmail(input.email)
    const task = new MainTask(account.account_id,"name", "task.description", "task.tag", null, true,[], new Date(), new Date())
    await this.taskRepository.create(task)
  }

  async getAll() {
    console.log(this.task)
  }

  async findByGroup() {
   
    
  }

  async update() {
   
  }
  async delete () {
    
  }
}
