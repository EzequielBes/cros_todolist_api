import { randomUUID } from "crypto";
import { Email } from "./vo/email";
import { Password } from "./vo/password";

export class Account {
  private constructor(
    readonly account_id: string,
    readonly email: Email,
    readonly password: Password,
    readonly username: string,
  ) {}

  static create (email, password, username) {
    const account_id = randomUUID()
    return new Account(account_id, new Email(email), new Password(password), username)
  }

  static restore (account_id, email, password, username) {
    return new Account(account_id, new Email(email), new Password(password), username)
  }

  getEmail() {
    return this.email.getValue()
  }

  getPassword() {
    return this.password.getValue()
  }

}
