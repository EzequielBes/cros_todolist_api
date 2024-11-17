import { randomUUID } from "crypto";
import { SubTask } from "./sub-task";
import { Task } from "./task";

export class MainTask extends Task {
  constructor(
    readonly owner_id: string, // id da pessoa dona
    readonly name: string,
    readonly description: string,
    readonly tag: string,
    readonly document: any,
    subtasks: SubTask[] = [],
    readonly id: string = randomUUID(),
  ) {
    super(name, description, tag, document, subtasks, id);
  }

  static restore(
    id: string,
    owner_id: string,
    name: string,
    description: string,
    tag: string,
    document: any,
    status: boolean,
    subtasks: SubTask[],
    created_at: Date,
    updated_at: Date,
  ) {
    const task = new MainTask(
      owner_id,
      name,
      description,
      tag,
      document,
      subtasks,
      id,
    );
    task._updated_at = updated_at;
    task._created_at = created_at;
    task._status = status;
    return task;
  }
}
