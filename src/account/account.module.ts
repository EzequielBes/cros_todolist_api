import { Module } from "@nestjs/common";
import { AccountController } from "./account-controller";
import { AccountService } from "./account-service";
import { AccountRepositoryTypeorm } from "../database/account-repository-typeorm";
import { AccountRepository } from "./account-respository";
import { DatabaseModule } from "../database/database.module";
import { AuthService } from "src/auth/auth.service";
import { JwtStrategy } from "src/auth/jwt.strategy";

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [AccountService, {
    provide:AccountRepository,
    useClass:AccountRepositoryTypeorm
  }, AuthService,JwtStrategy ],
  exports: [AccountService],
})
export class AccountModule {}
