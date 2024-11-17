import { randomUUID } from "crypto";
import { SubTask } from "./sub-task";
export abstract class Task {
    protected _subtasks:SubTask[]
    protected _status:boolean
    protected _updated_at: Date
    protected _created_at: Date

    constructor (
        readonly name:string,
        readonly description:string,
        readonly tag:string,
        readonly document:any,
        subtasks:SubTask[],
        readonly id: string = randomUUID(),
    ) {
        this._subtasks = subtasks
        this._created_at = new Date()
    }

    public addSubtask(subtask:SubTask):void {
        this.subtasks.push(subtask)
    }

    get subtasks(): SubTask[] {
        return this._subtasks
    }

    public deleteSubtask():void {
        //logica de deletar subtask
    }

    get created_at(): Date {
        return this._created_at
    }

    get updated_at(): Date{
        return this._updated_at
    }

    get status():boolean {
        return this._status
    }

    // public updateStatus(status:"CONCLUIDO"|"NAO_CONCLUIDO"){
    //     this.status = status === "CONCLUIDO" ? true:false
    //     this.updated_at = new Date()
    // }
}


