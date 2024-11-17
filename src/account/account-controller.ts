import {
  Body,
  Controller,
  Delete,
  Headers,
  Post,
  Put,
} from "@nestjs/common";
import { AccountService } from "./account-service";
import { CreateAccountInput } from "./dto/create-account-input";
import { Public } from "src/auth/constants";
import { UpdateAccountInput } from "./dto/update-account-input";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SigninAccountDto } from "./dto/signin-account-input";
import { Signintype } from "./types/signin.type";

@ApiTags("User Account") 
@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({
    summary: "Create a user account",
    description: "Endpoint para criar uma nova conta de usuário. Requer `email`, `password` e `username` no corpo da requisição.",
  })
  @ApiResponse({
    status: 201,
    description: "Usuário criado com sucesso.",
  })
  @ApiResponse({
    status: 402,
    description: "Já existe um usuário com esse email.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro interno do servidor.",
  })
  @Public()
  @Post("signup")
  async signup(@Body() body: CreateAccountInput): Promise<void> {
    await this.accountService.create({
      email: body.email,
      password: body.password,
      username: body.username,
    });
  }

  @ApiOperation({
    summary: "User Signin",
    description: "Faz login do usuário e retorna um token de autenticação no formato `Bearer Token`.",
  })
  @ApiResponse({
    status: 201,
    description: "Login bem-sucedido. Retorna o token de autenticação.",
    type: Signintype,
  })
  @ApiResponse({
    status: 404,
    description: "Conta não encontrada.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro interno do servidor.",
  })
  @Public()
  @Post("signin")
  async signin(@Body() body: SigninAccountDto): Promise<Signintype | null> {
    return await this.accountService.signin(body);
  }

  @ApiOperation({
    summary: "Update account information",
    description: "Atualiza as informações da conta do usuário. Requer autenticação com Bearer Token.",
  })
  @ApiBearerAuth() 
  @ApiResponse({
    status: 200,
    description: "Informações da conta atualizadas com sucesso.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação inválido ou ausente.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro interno do servidor.",
  })
  @Put("update")
  async update(@Body() body: UpdateAccountInput, @Headers() token: any): Promise<void> {
    const idToken = token.authorization;
    await this.accountService.update(body, idToken);
  }

  @ApiOperation({
    summary: "Delete account",
    description: "Deleta a conta do usuário autenticado. Requer autenticação com Bearer Token.",
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "Conta deletada com sucesso.",
  })
  @ApiResponse({
    status: 401,
    description: "Token de autenticação inválido ou ausente.",
  })
  @ApiResponse({
    status: 500,
    description: "Erro interno do servidor.",
  })
  @Delete("delete")
  async delete(@Headers() token: any): Promise<void> {
    const idToken = token.authorization;
    await this.accountService.delete(idToken);
  }
}
