import { randomUUID } from "crypto"
import { MainTask } from "./main-task"
import { Task } from "./task"

export class SubTask extends Task {
    constructor (
        readonly owner_task_id: string, 
        readonly name:string,
        readonly description:string,
        readonly tag:string,
        readonly document:any,
        subtasks:SubTask[] = [],
        readonly id: string = randomUUID(),
    ) {
        super(name,description,tag,document,subtasks,id)
    }

    restore(id: string, owner_id:string, name: string, description: string, tag: string, document: any, status: boolean,subtasks:SubTask[],created_at:Date,updated_at:Date) {
        const task = new SubTask(owner_id, name, description, tag, document,subtasks,id)
        task._updated_at = updated_at;
        task._created_at = created_at;
        task._status = status
        return task
    }
}
