import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthService } from "src/auth/auth.service";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { TaskController } from "./tasks.controller";
import { TaskRepository } from "./task-repository";
import { TaskService } from "./task.service";
import { AccountModule } from "@/account/account.module";
import { TaskRepositoryTypeorm } from "@/database/task-repository-typeorm";


@Module({
  imports: [DatabaseModule,AccountModule],
  controllers: [TaskController],
  providers: [
    {
      provide:TaskRepository,
      useClass:TaskRepositoryTypeorm
    }
    ,TaskService ],
  exports: [TaskRepository,TaskService],
})
export class TaskModuleModule {}
