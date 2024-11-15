import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Account } from "./account";
import { AccountRepository } from "./account-respository";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository, private auth: AuthService) {}

  async create(input: {
    email: string;
    password: string;
    username: string;
  }): Promise<void> {
    const accountExists =  await this.accountRepository.find(input.email);
    if(accountExists) throw new HttpException("Account already exists", 402);
    const account = Account.create(input.email, input.password, input.username);
    await this.accountRepository.create(account);
  }

  async signin(input: {email:string, password:string}){
    const account = await this.accountRepository.find(input.email)
    if (!account) {
      throw new UnauthorizedException();
    }
     const restore = Account.restore(account.account_id, account.getEmail(), account.getPassword(), account.username)
    if(input.password != restore.getPassword())throw new HttpException("Usuario ou senha invalidos", 401);
    const payload = { userEmail: account.email, account_id: account.account_id };
    const token =  await this.auth.signIn(payload)

    return token;
  }

  async findOne(email:string) {
    const account = await this.accountRepository.find(email);
    if(!account) throw new HttpException("account not finded", 404);
    return Account.restore(account.account_id, account.email.getValue(), account.password.getValue(), account.username)
  }

  async update(input:{email : string, newEmail:string, newPassword:string, newUsername:string}, token:string) {
    const account = this.accountRepository.find(input.email)
    if(!account) throw new HttpException("Account not finded", 404);
    const isvalidToken =  await this.auth.decoded(token)
    console.log(token)
    console.log(isvalidToken)
    if(!isvalidToken) throw new HttpException("nao autorizado", 401);
    

   }
  // async delete (input: {email:string}, headers: {token:string}) {
  //   const account = this.accountRepository.findAccountByEmail(input.email);
  //   if(!account) throw new Error("invalid email");
    
  // }
}
