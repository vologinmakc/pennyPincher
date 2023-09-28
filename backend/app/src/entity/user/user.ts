import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    name: string;

    @Column()
    password: string;

    @Column({ name: "first_name" })
    firstName: string;

    @Column({ name: "last_name" })
    lastName: string;

    @Column({ name: "email" })
    email: string;

    toString(): string {
        return `User: ${this.name} (ID: ${this.id})`;
    }
}
