"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
(0, typeorm_1.createConnection)().then(async (connection) => {
    app_1.default.listen(8000, () => {
        console.log("Server started on http://localhost:8000");
    });
}).catch(error => console.log(error));
//# sourceMappingURL=index.js.map