"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    async index(req, res) {
        const user = req.user;
        res.json(user);
    }
}
exports.default = new IndexController();
//# sourceMappingURL=indexController.js.map