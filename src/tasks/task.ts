import { randomUUID } from "crypto";

// export class Task {
//     private constructor (
//         readonly task_id: string,
//         readonly name:string,
//         readonly description:string,
//         readonly tag:string,
//         readonly document:any,
//         readonly status:boolean,
//         readonly created_at:Date,
//         readonly updated_at:Date,

//     ) {}

//     static create (name:string, description:string, tag:string, document:any, status:boolean) {
//         const id = randomUUID()
//         return new Task(id, name, description, tag, document, status, new Date(), new Date())
//     }

//     restore (task_id:string, name:string, description:string, tag:string, document:any, status:boolean, created_at:Date, updated_at:Date) {
//         return new Task(task_id, name, description, tag, document, status, created_at, updated_at)
//     }
// }

export abstract class Task {
    protected _subtasks:SubTask[]

    constructor (
        readonly name:string,
        readonly description:string,
        readonly tag:string,
        readonly document:any,
        readonly status:boolean,
        readonly created_at: Date,
        readonly updated_at: Date,
        subtasks:SubTask[],
        readonly id: string = randomUUID(),
    ) {
        this._subtasks = subtasks
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
}

export class MainTask extends Task {
    constructor (
        readonly owner_id:string, // id da pessoa dona
        readonly name:string,
        readonly description:string,
        readonly tag:string,
        readonly document:any,
        readonly status:boolean,
        subtasks:SubTask[],
        readonly created_at: Date,
        readonly updated_at: Date,
        readonly id: string = randomUUID(),
    ) {
        super(name,description,tag,document,status,created_at,updated_at,subtasks,id)
    }

    restore(id: string, owner_id:string, name: string, description: string, tag: string, document: any, status: boolean,subtasks:SubTask[],created_at:Date,updated_at:Date) {
        new MainTask(owner_id, name, description, tag, document, status,subtasks, created_at, updated_at,id)
    }
}

export class SubTask extends Task {
    constructor (
        readonly owner_task_id: string, 
        readonly name:string,
        readonly description:string,
        readonly tag:string,
        readonly document:any,
        readonly status:boolean,
        subtasks:SubTask[],
        readonly created_at: Date,
        readonly updated_at: Date,
        readonly id: string = randomUUID(),
    ) {
        super(name,description,tag,document,status,created_at,updated_at,subtasks,id)
    }

    restore(id: string, owner_id:string, name: string, description: string, tag: string, document: any, status: boolean,subtasks:SubTask[],created_at:Date,updated_at:Date) {
        new MainTask(owner_id, name, description, tag, document, status,subtasks, created_at, updated_at,id)
    }
}
/*
 -> main task (fazer cafe)
    -> subtask (ferver agua)
        -> sub da sub (pegar agua)
        -> sub da sub (pegar panela)  
            -> sub da sub da sub (lavar panela) 
*/

/*
 -> main task (fazer cafe)
    -> subtask (ferver agua)
        -> sub da sub (pegar agua)
        -> sub da sub (pegar panela)  
            -> sub da sub da sub (lavar panela)

            task -> cafe da manha
              - id cafe da manha
              - subtask 1
                - subsub id 1

              - subtask cafe da manha 2
                    -subsub id 1
                      - subsubsub id 2
                */          

                      // a task principal tem filhos, e os filhos tem filhos

// export abstract class MainTask extends ZzTask {
//     constructor (
//         readonly owner_id: string,
//         readonly task_id: string,
//         readonly name:string,
//         readonly description:string,
//         readonly tag:string,
//         readonly document:any,
//         readonly status:boolean,
//         readonly created_at:Date,
//         readonly updated_at:Date,
//     ) {
//         super()
//     }
// }
// export abstract class SubTask extends ZzTask {
//     constructor (
//         readonly task_id: string,
//         readonly name:string,
//         readonly description:string,
//         readonly tag:string,
//         readonly document:any,
//         readonly status:boolean,
//         readonly created_at:Date,
//         readonly updated_at:Date,
//     ) {
//         super()
//     }
// }


