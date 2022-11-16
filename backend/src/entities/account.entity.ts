import { Exclude } from "class-transformer";
import { Entity, Column,  PrimaryGeneratedColumn} from "typeorm";

@Entity("Accounts")
export class Account{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("decimal", {precision: 12, scale: 2, default: 100.00})
    @Exclude()
    balance: number;    
}