import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
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

  // @OneToMany(() => MainTaskEntity, (task) => task)
  // children: SubTaskEntity[];
}
