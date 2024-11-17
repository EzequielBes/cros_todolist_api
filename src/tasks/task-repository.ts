import { MainTask } from "./main-task";
import { SubTask } from "./sub-task";
import { Task } from "./task";

export abstract class TaskRepository {
  abstract findAllTasks(owner_id:string): Promise<Task[] | null>;
  abstract findTaskById(id: string, owner_id:string): Promise<Task | null>;
  abstract findTaskByStatus(status:boolean):Promise<MainTask[] | null>
  abstract findMainTaskById(id: string, owner_id:string): Promise<MainTask>;
  abstract findSubTaskById(id: string): Promise<SubTask>;
  abstract findByTag(value:string): Promise<MainTask[] | null>;
  abstract create(account: Task): Promise<void>;
  abstract update(updatedTask: Task): Promise<void>;
  abstract delete(id: string,owner_id:string): Promise<void>;
}
