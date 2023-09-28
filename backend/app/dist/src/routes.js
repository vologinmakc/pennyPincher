"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const jwtMiddleware_1 = __importDefault(require("./middleware/auth/jwtMiddleware"));
const routes = (0, express_1.Router)();
// index route
routes.use('/login', authRoutes_1.default);
routes.use('/', jwtMiddleware_1.default, indexRoutes_1.default);
exports.default = routes;
//# sourceMappingURL=routes.js.map