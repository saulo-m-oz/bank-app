import { Exclude } from "class-transformer";
import { Entity, Column,  PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { MinLength } from "class-validator";
import { Account } from "./account.entity";

@Entity("Users")
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    @MinLength(3)
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    accountId: string;

    @OneToOne(() => Account)
    @JoinColumn()
    @Exclude()
    account: Account;
}