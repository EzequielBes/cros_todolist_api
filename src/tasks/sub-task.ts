import { randomUUID } from "crypto";
import { MainTask } from "./main-task";
import { Task } from "./task";

export class SubTask extends Task {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly tag: string,
    readonly document: any,
    readonly main_task_id?: string,
    readonly parent_sub_task_id?: string,
    subtasks: SubTask[] = [],
    readonly id: string = randomUUID(),
  ) {
    super(name, description, tag, document, subtasks, id);
  }

  static restore(
    id: string,
    name: string,
    description: string,
    tag: string,
    document: any,
    status: boolean,
    subtasks: SubTask[],
    created_at: Date,
    updated_at: Date,
    main_task_id: string,
    parent_task_id: string,
  ) {
    const task = new SubTask(
      name,
      description,
      tag,
      document,
      main_task_id,
      parent_task_id,
      subtasks,
      id,
    );
    task._updated_at = updated_at;
    task._created_at = created_at;
    task._status = status;
    return task;
  }
}
