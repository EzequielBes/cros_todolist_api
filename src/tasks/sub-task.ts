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
    updated_at?:Date,
    status: boolean = false,
    created_at?:Date
  ) {
    super(name, description, tag, document,status, subtasks, id, created_at,updated_at);
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
    return new SubTask(
      name,
      description,
      tag,
      document,
      main_task_id,
      parent_task_id,
      subtasks,
      id,
      updated_at,
      status,
      created_at
    );
  }

  public update(input:{
    name: string,
    description: string,
    tag: string,
    document: Buffer,
    status: boolean}):Task {
      return new SubTask(
        input.name ?? this.name,
        input.description ?? this.description,
        input.tag ?? this.tag,
        input.document ?? this.document,
        this.main_task_id,
        this.parent_sub_task_id,
        this.subtasks,
        this.id,
        new Date(),
        input.status,
        this.created_at
      )
  }
}
