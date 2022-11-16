import { Exclude } from "class-transformer";
import { Entity, Column,  PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Account } from "./account.entity";

@Entity("Transactions")
export class Transaction{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("decimal", {precision: 12, scale: 2})
    value: number;
    
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    debitedAccountId: string;

    @Column()
    creditedAccountId: string;

    @ManyToOne(() => Account, (debitedAccount) => debitedAccount.id, {nullable: false})
    @Exclude()
    debitedAccount: Account;

    @ManyToOne(() => Account, (creditedAccount) => creditedAccount.id, {nullable: false})
    @Exclude()
    creditedAccount: Account;

}