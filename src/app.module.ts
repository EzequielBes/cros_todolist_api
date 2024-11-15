import { Module } from "@nestjs/common";
import { AccountModule } from "./account/account.module";
import { AccountController } from "./account/account-controller";
import { ConfigModule } from '@nestjs/config';
import typeorm from './database/typeorm.config';
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    DatabaseModule,
    AccountModule],
  controllers: [AccountController],
  providers: [],
})
export class AppModule {}
