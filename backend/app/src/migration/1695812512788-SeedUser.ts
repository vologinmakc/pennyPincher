import {MigrationInterface, QueryRunner} from "typeorm";
import bcrypt from "bcrypt";

const saltRounds = 10;
const hashedPassword = bcrypt.hashSync("123456", saltRounds);


export class SeedUser1695812512788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into("users")
            .values([
                {
                    name: "admin",
                    password: hashedPassword,
                    firstName: "Admin",
                    lastName: "User",
                    email: "admin@example.com"
                }
            ])
            .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from("users")
            .where("email = :email", {email: "admin@example.com"})
            .execute();
    }

}
