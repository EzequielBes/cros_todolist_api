import { Body, Controller, Delete, Header, Headers, Post, Put, Query } from "@nestjs/common";
import { AccountService } from "./account-service";
import { CreateAccountInput } from "./inputs/create-account-input";
import { Public } from "src/auth/constants";
import { UpdateAccountInput } from "./inputs/update-account-input";

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
  async update(@Body() body: UpdateAccountInput, @Headers() token:any){
    const idToken = token.authorization
    await this.accountService.update(body, idToken)
  }

  @Delete("delete")
  async delete(@Headers() token:any){
    const idToken = token.authorization
    await this.accountService.delete(idToken)
  }
}
