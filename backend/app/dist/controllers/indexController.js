"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("../entity/user/user");
class IndexController {
    async index(req, res) {
        const userRepository = (0, typeorm_1.getRepository)(user_1.User.name);
        const users = await userRepository.find();
        res.json(users);
    }
}
exports.default = new IndexController();
//# sourceMappingURL=indexController.js.map