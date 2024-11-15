import { Account } from "./account";

export abstract class AccountRepository {
  abstract find(email:string): Promise<Account | null>;
  abstract create(account: Account): Promise<void>;
}
