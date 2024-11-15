import { Account } from "../account/account";
import { AccountRepository } from "../account/account-respository";
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from './account.entity'
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountRepositoryTypeorm implements AccountRepository {

    private readonly repository: Repository<AccountEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(AccountEntity);
    }

    async find(email:string): Promise<Account> {
        const accountInDb = await this.repository.findOne({where:{email:email}})
        if(!accountInDb) return
        return Account.restore(accountInDb.id, accountInDb.email, accountInDb.password, accountInDb.username)
    }

    async create(account: Account): Promise<void> {
        const accountToBeCreated = this.repository.create({
            password: account.password.getValue(),
            username: account.username,
            email: account.email.getValue(),
        })
        await this.repository.save(accountToBeCreated)
    }
    
}
