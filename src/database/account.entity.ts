import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
  } from 'typeorm';

  
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
// todo taks
// uma task tem somente um dono
// uma task tem infinitas subtasks

// task principal tem o id do dono
// taks secundarias tem id das task principal
