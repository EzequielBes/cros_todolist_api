import { Injectable } from "@nestjs/common";
import { Account } from "./account";
import { AccountRepository } from "./account-respository";

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async create(input: {
    email: string;
    password: string;
    username: string;
  }): Promise<void> {
    const accountExists =  await this.accountRepository.find(input.email);
    if(accountExists) throw new Error("ja existe uma conta com esse email");
    const account = Account.create(input.email, input.password, input.username);
    await this.accountRepository.create(account);
  }

  // async signin(input: {email: string, password:string}) {
  //   const account = this.accountRepository.find(input.email)
  //   if(!account) throw new Error("nao foi encontrado uma conta com o email informado");
  //   const matchPassword = new MatchPassword(input.password, account.password);
  //   if(!matchPassword) throw new Error("Email ou senha invalidos");
  //   return jwtGenerate()
    
    
  // }

  // async update(input:{id : string, newEmail:string, newPassword:string, newUsername:string}, headers:{token: string}) {
  //   const account = this.accountRepository.findAccountById(input.id)
  //   if(!account) throw new Error("nAO FOI ENCONTRADO UMA CONTA COM O EMAIL INFORMADO");
  //   const isvalidToken = ValidateToken(headers.token)
  //   if(!isvalidToken) throw new Error("nao autorizado");
    

  // }
  // async delete (input: {email:string}, headers: {token:string}) {
  //   const account = this.accountRepository.findAccountByEmail(input.email);
  //   if(!account) throw new Error("invalid email");
    
  // }
}
