import { Body, Controller, Post } from "@nestjs/common";
import { AccountService } from "./account-service";
import { CreateAccountInput } from './inputs/create-account-input'


@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post("create")
  async signin(
    @Body() body: CreateAccountInput,
  ): Promise<void> {
    await this.accountService.create({
      email: body.email,
      password: body.password,
      username: body.username,
    });
  }

  // @Post("signin")
  // signin(@Body() body: SigninDTO): any {
  //   const output = this.accountService.signin(body);
  //   return output;
  // }
  // @Post("signup")
  // createAccount(@Body() body: CreateAccountDTO): any {
  //   const output = this.accountService.createAccount(body);
  //   return output;
  // }
  // @Put("update")
  // updateAccount(
  //   @Body() body: UpdateAccountDTO,
  //   @Headers("security-key") securityKey: string,
  // ): any {
  //   const output = this.accountService.updateAccount(body, securityKey);
  //   return output;
  // }
  // @Delete()
  // deleteAccount(
  //   @Body() body: DeleteAccountDTO,
  //   @Headers("security-key") securityKey: string,
  // ): void {
  //   const output = this.accountService.deleteAccount(body, securityKey);
  //   return output;
  // }
}
