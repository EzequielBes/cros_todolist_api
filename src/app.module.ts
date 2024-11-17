import { Module } from "@nestjs/common";
import { AccountModule } from "./account/account.module";
import { AccountController } from "./account/account-controller";
import { ConfigModule } from '@nestjs/config';
import typeorm from './database/typeorm.config';
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { TaskModuleModule } from "./tasks/tasks.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    AuthModule,
    DatabaseModule,
    AccountModule,
    TaskModuleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
   { provide: APP_GUARD,
      useClass: AuthGuard,}
],
})
export class AppModule {}
