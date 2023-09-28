"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("../../entity/user/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!decoded.id) {
                return res.sendStatus(403);
            }
            const userRepository = (0, typeorm_1.getRepository)(user_1.User.name);
            const user = await userRepository.findOne(decoded.id);
            if (!user) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        }
        catch (err) {
            return res.sendStatus(403);
        }
    }
    else {
        res.sendStatus(401);
    }
}
exports.default = authenticateJWT;
//# sourceMappingURL=jwtMiddleware.js.map