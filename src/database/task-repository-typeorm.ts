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
  async findTaskById(id: string): Promise<Task | null> {
    const mainTask = await this.findMainTaskById(id);
    if (mainTask) return mainTask;
    return await this.findSubTaskById(id);
  }
  findByTag(): Promise<Task | null> {
    throw new Error("Method not implemented.");
  }

  async findMainTaskById(id: string): Promise<MainTask> {
    const maintask = await this.repositoryMainTask.findOneById(id);
    if (!maintask) return;
    const subtasks = maintask.subtasks?.map((sub) =>
      SubTask.restore(
        sub.id,
        sub.name,
        sub.description,
        sub.tag,
        sub.document,
        sub.isCompleted,
        subtasks,
        sub.created_at,
        sub.updated_at,
        sub.main_task_id,
        sub.parent_sub_task_id,
      ),
    );
    return MainTask.restore(
      id,
      maintask.owner_id,
      maintask.name,
      maintask.description,
      maintask.tag,
      maintask.document,
      maintask.status,
      subtasks ?? [],
      maintask.created_at,
      maintask.updated_at,
    );
  }

  async findSubTaskById(id: string): Promise<SubTask> {
    const subtask = await this.repositorySubTask.findOneById(id);
    if (!subtask) return;
    const subtasks = subtask.children?.map((sub) =>
      SubTask.restore(
        sub.id,
        sub.name,
        sub.description,
        sub.tag,
        sub.document,
        sub.isCompleted,
        subtasks,
        sub.created_at,
        sub.updated_at,
        subtask.main_task_id,
        subtask.parent_sub_task_id,
      ),
    );
    return SubTask.restore(
      id,
      subtask.name,
      subtask.description,
      subtask.tag,
      subtask.document,
      subtask.isCompleted,
      subtasks ?? [],
      subtask.created_at,
      subtask.updated_at,
      subtask.main_task_id,
      subtask.parent_sub_task_id,
    );
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
