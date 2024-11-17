import { MainTaskEntity } from "@/database/main-task.entity";
import { TaskRepository } from "@/tasks/task-repository";
import { HttpException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SubTaskEntity } from "./subtask.entity";
import { Task } from "@/tasks/task";
import { MainTask } from "@/tasks/main-task";
import { SubTask } from "@/tasks/sub-task";

@Injectable()
export class TaskRepositoryTypeorm implements TaskRepository {
  private readonly repositoryMainTask: Repository<MainTaskEntity>;
  private readonly repositorySubTask: Repository<SubTaskEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repositoryMainTask = this.dataSource.getRepository(MainTaskEntity);
    this.repositorySubTask = this.dataSource.getRepository(SubTaskEntity);
  }

  findAllTasks(email: string): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }
  findTaskById(id: string): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }
  findByTag(): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }

  async create(task: Task): Promise<void> {
    if (task instanceof MainTask) {
      const newMaintask = this.repositoryMainTask.create(task);
      await this.repositoryMainTask.save(newMaintask);
    } else if (task instanceof SubTask) {
      const newSubtask = this.repositorySubTask.create(task);
      await this.repositorySubTask.insert(newSubtask);
    }
  }

  update(updatedAccount: Task): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(account_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
