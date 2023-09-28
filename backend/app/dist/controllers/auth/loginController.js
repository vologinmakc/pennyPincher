"use strict";
// loginController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("../../entity/user/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    async authenticate(req, res) {
        const { name, password } = req.body;
        const userRepository = (0, typeorm_1.getRepository)(user_1.User.name);
        const user = await userRepository.findOne({ where: { name } });
        if (!user) {
            res.status(401).json({ message: "Invalid name or password" });
            return;
        }
        const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid name or password" });
            return;
        }
        // Генерация JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ name });
    }
}
exports.default = new LoginController();
//# sourceMappingURL=loginController.js.map