import { MainTask } from "./main-task";
import { SubTask } from "./sub-task";
import { Task } from "./task";

export abstract class TaskRepository {
  abstract findAllTasks(email: string): Promise<Task | null>;
  abstract findTaskById(id: string): Promise<Task | null>;
  abstract findMainTaskById(id: string): Promise<MainTask>;
  abstract findSubTaskById(id: string): Promise<SubTask>;
  abstract findByTag(): Promise<Task | null>;
  abstract create(account: Task): Promise<void>;
  abstract update(updatedAccount: Task): Promise<void>;
  abstract delete(account_id: string): Promise<void>;
}
