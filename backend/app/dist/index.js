"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
(0, typeorm_1.createConnection)().then(async (connection) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(routes_1.default);
    // Обработчик ошибок
    app.use((err, req, res, next) => {
        console.error(err.stack); // Выводит стек ошибки в консоль
        res.status(500).send('Something broke!');
    });
    app.listen(8000, () => {
        console.log("Server started on http://localhost:8000");
    });
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map