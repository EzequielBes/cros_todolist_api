import { MainTaskEntity } from "@/database/main-task.entity";
import { TaskRepository } from "@/tasks/task-repository";
import { HttpException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SubTaskEntity } from "./subtask.entity";
import { Task } from "@/tasks/task";
import { MainTask } from "@/tasks/main-task";
import { SubTask } from "@/tasks/sub-task";

@Injectable()
export class TaskRepositoryTypeorm implements TaskRepository {
  private readonly repositoryMainTask: Repository<MainTaskEntity>;
  private readonly repositorySubTask: Repository<SubTaskEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repositoryMainTask = this.dataSource.getRepository(MainTaskEntity);
    this.repositorySubTask = this.dataSource.getRepository(SubTaskEntity);
  }

  async findAllTasks(owner_id:string): Promise<Task[] | null> {
    const maintaskDb = await this.repositoryMainTask.find({
      where:{owner_id:owner_id},
      relations:['subtasks']
    })

    const maintasks = maintaskDb.map(item => {
      const subtasks = item.subtasks?.map((sub) =>
        SubTask.restore(
          sub.id,
          sub.name,
          sub.description,
          sub.tag,
          sub.document,
          sub.status,
          [],
          sub.created_at,
          sub.updated_at,
          sub.main_task_id,
          sub.parent_sub_task_id,
        ),
      );

      return MainTask.restore(
        item.id,
        item.owner_id,
        item.name,
        item.description,
        item.tag,
        item.document,
        item.status,
        subtasks ?? [],
        item.created_at,
        item.updated_at,
      )
    })
    return maintasks
  }

  async findTaskById(id: string, owner_id:string): Promise<Task | null> {
    const mainTask = await this.findMainTaskById(id,owner_id);
    if (mainTask) return mainTask;
    return await this.findSubTaskById(id);
  }

  async findByTag(tag:string): Promise<MainTask[] | null> {
   const task = await this.repositoryMainTask.find({
      where:{
        tag:tag
      },
      relations:['subtasks']
    })
    if(!task)return
    return task?.map((item) => MainTask.restore(
     item.id,
     item.owner_id,
     item.name,
     item.description,
     item.tag,
     item?.document,
     item.status,
     item.subtasks?.map(sub => SubTask.restore(
      sub?.id,
      sub?.name,
      sub?.description,
      sub?.tag,
      sub?.document,
      sub?.status,
      [],
      sub.created_at,
      sub.updated_at,
      sub.main_task_id,
      sub.parent_sub_task_id,
    )),
     item.created_at,
     item.updated_at,
   ))
    
  }

  async findMainTaskById(id: string, owner_id:string): Promise<MainTask> {
    const maintask = await this.repositoryMainTask.findOne({
      where: {
        id: id,
        owner_id: owner_id
      }
    });
    if (!maintask) return;
    const subtasks = maintask.subtasks?.map((sub) =>
      SubTask.restore(
        sub.id,
        sub.name,
        sub.description,
        sub.tag,
        sub.document,
        sub.status,
        subtasks,
        sub.created_at,
        sub.updated_at,
        sub.main_task_id,
        sub.parent_sub_task_id,
      ),
    );
    return MainTask.restore(
      id,
      maintask.owner_id,
      maintask.name,
      maintask.description,
      maintask.tag,
      maintask.document,
      maintask.status,
      subtasks ?? [],
      maintask.created_at,
      maintask.updated_at,
    );
  }

  async findTaskByStatus(status: boolean):Promise<MainTask[] | null> {
    const task = await this.repositoryMainTask.find({
      where:{
        status:!!status
      },
      relations:['subtasks']
    })
    if(!task)return

    return task.map((item) => MainTask.restore(
     item.id,
     item.owner_id,
     item.name,
     item.description,
     item.tag,
     item.document,
     item.status,
     item.subtasks?.map(sub => SubTask.restore(
      sub?.id,
      sub?.name,
      sub.description,
      sub.tag,
      sub.document,
      sub.status,
      [],
      sub.created_at,
      sub.updated_at,
      sub.main_task_id,
      sub.parent_sub_task_id,
    )),
     item.created_at,
     item.updated_at,
   ))
    
  }

  async findSubTaskById(id: string): Promise<SubTask> {
    const subtask = await this.repositorySubTask.findOneById(id);
    if (!subtask) return;
    const subtasks = subtask.children?.map((sub) =>
      SubTask.restore(
        sub.id,
        sub.name,
        sub.description,
        sub.tag,
        sub.document,
        sub.status,
        subtasks,
        sub.created_at,
        sub.updated_at,
        subtask.main_task_id,
        subtask.parent_sub_task_id,
      ),
    );
    return SubTask.restore(
      id,
      subtask.name,
      subtask.description,
      subtask.tag,
      subtask.document,
      subtask.status,
      subtasks ?? [],
      subtask.created_at,
      subtask.updated_at,
      subtask.main_task_id,
      subtask.parent_sub_task_id,
    );
  }
  async create(task: Task): Promise<void> {
    if (task instanceof MainTask) {
      const newMaintask = this.repositoryMainTask.create(task);
      await this.repositoryMainTask.save(newMaintask);
    } else if (task instanceof SubTask) {
      const newSubtask = this.repositorySubTask.create(task);
      await this.repositorySubTask.insert(newSubtask);
    }
  }

  async update(updatedTask: Task): Promise<void> {
    if(updatedTask instanceof MainTask)
    await this.repositoryMainTask.update(updatedTask.id, {
      document:updatedTask.document,
      name: updatedTask.name,
      status: !!updatedTask.status,
      description: updatedTask.description,
      tag: updatedTask.tag,
      updated_at: updatedTask.updated_at
    });
    await this.repositorySubTask.update(updatedTask.id, {
      document:updatedTask.document,
      name: updatedTask.name,
      status: !!updatedTask.status,
      description: updatedTask.description,
      tag: updatedTask.tag,
      updated_at: updatedTask.updated_at
    });
  }

  async delete(id: string,owner_id:string): Promise<void> {
    await this.repositoryMainTask.delete({id:id,owner_id:owner_id})
    await this.repositorySubTask.delete({id:id})
  }
}
