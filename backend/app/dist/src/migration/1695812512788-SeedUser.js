"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedUser1695812512788 = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const hashedPassword = bcrypt_1.default.hashSync("123456", saltRounds);
class SeedUser1695812512788 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from("users")
            .where("email = :email", { email: "admin@example.com" })
            .execute();
    }
}
exports.SeedUser1695812512788 = SeedUser1695812512788;
//# sourceMappingURL=1695812512788-SeedUser.js.map