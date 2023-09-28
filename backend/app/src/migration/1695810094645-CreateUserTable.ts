import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1695810094645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {name: "name", type: "varchar"},
                    {name: "password", type: "varchar"},
                    {name: "first_name", type: "varchar"},
                    {name: "last_name", type: "varchar"},
                    {name: "email", type: "varchar"},
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
