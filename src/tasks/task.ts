import { randomUUID } from "crypto";
import { SubTask } from "./sub-task";
export abstract class Task {


    constructor (
        readonly name:string,
        readonly description:string,
        readonly tag:string,
        readonly document:any,
        readonly status:boolean,
        readonly subtasks:SubTask[],
        readonly id: string = randomUUID(),
        readonly created_at: Date,
        readonly updated_at?: Date
    ) {
        if(!this.created_at){
            this.created_at = new Date()
        }
    }

    public addSubtask(subtask:SubTask):void {
        this.subtasks.push(subtask)
    }

    abstract update(input:{ 
        name: string,
        description: string,
        tag: string,
        document: any,
        status: boolean
    }):Task

}


