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
    public subtasks: SubTask[] = [],
    readonly id: string = randomUUID(),
    updated_at?: Date,
    status:boolean = false,
    created_at?:Date
  ) {
    super(name, description, tag, document,status, subtasks, id,created_at,updated_at);
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
   return new MainTask(
      owner_id,
      name,
      description,
      tag,
      document,
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
    status: boolean
  }):Task {
    return new MainTask(
        this.owner_id,
        input.name ?? this.name,
        input.description ?? this.description,
        input.tag ?? this.tag,
        input.document ?? this.document,
        this.subtasks,
        this.id,
        new Date(),
        input.status,
        this.created_at
      )
  }
}
