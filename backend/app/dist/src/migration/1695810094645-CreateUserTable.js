"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1695810094645 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserTable1695810094645 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                { name: "name", type: "varchar" },
                { name: "password", type: "varchar" },
                { name: "first_name", type: "varchar" },
                { name: "last_name", type: "varchar" },
                { name: "email", type: "varchar" },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("users");
    }
}
exports.CreateUserTable1695810094645 = CreateUserTable1695810094645;
//# sourceMappingURL=1695810094645-CreateUserTable.js.map