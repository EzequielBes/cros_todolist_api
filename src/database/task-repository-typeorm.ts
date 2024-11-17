import { MainTaskEntity } from "@/database/main-task.entity";
import { Task } from "@/tasks/task";
import { TaskRepository } from "@/tasks/task-repository";
import { HttpException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class TaskRepositoryTypeorm implements TaskRepository {
    private readonly repository: Repository<MainTaskEntity>;

    constructor(private readonly dataSource: DataSource) {
      this.repository = this.dataSource.getRepository(MainTaskEntity);
    }

    findAllTasks(email: string): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    findTaskById(id: string): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    findByTag(): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    async create(task: Task): Promise<void> {
        console.log(task)
        throw new HttpException("Method not implemented.", 402);
        // this.repository.create({
        //     id:task.id
        // })
        
    }
    update(updatedAccount: Task): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(account_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
