import { Body, Controller, Header, Headers, Post, Put, Query } from "@nestjs/common";
import { AccountService } from "./account-service";
import { CreateAccountInput } from "./inputs/create-account-input";
import { Public } from "src/auth/constants";

@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post("signup")
  async signup(@Body() body: CreateAccountInput): Promise<void> {
    await this.accountService.create({
      email: body.email,
      password: body.password,
      username: body.username,
    });
  }
  @Public()
  @Post("signin")
  async signin(@Body() body: {email:string, password:string}) {
    return await this.accountService.signin(body)
  }

  @Put("update")
  async update(@Body() body: {email:string, newEmail:string, newPassword:string, newUsername:string}, @Headers() token:any){
    console.log(token)
    await this.accountService.update(body, token.authorization)
  }
}
