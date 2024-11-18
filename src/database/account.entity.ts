import {
    Column,
    Entity,
    PrimaryColumn,
    Unique,
  } from 'typeorm';
import {MainTaskEntity} from './main-task.entity'
  
@Entity('account')
@Unique(['email'])
export class AccountEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

}
