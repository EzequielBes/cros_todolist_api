import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';
import {MainTaskEntity} from './main-task.entity'
  
@Entity('account')
@Unique(['email'])
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;


}
