"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("../../../app"));
const ormconfig_test_json_1 = __importDefault(require("../../../../ormconfig.test.json"));
const testConfig = ormconfig_test_json_1.default;
beforeAll(async () => {
    const connection = await (0, typeorm_1.createConnection)(testConfig);
    // Удалить базу данных
    await connection.dropDatabase();
    await connection.runMigrations();
});
afterAll(async () => {
    const connection = (0, typeorm_1.getConnection)();
    await connection.undoLastMigration();
    await (0, typeorm_1.getConnection)().close();
});
describe('Login Controller', () => {
    it('should authenticate user with valid credentials', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({
            name: 'admin',
            password: '123456',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token');
    });
    it('should not authenticate user with invalid credentials', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({
            name: 'admin',
            password: 'wrongpassword',
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Неверные данные пользователя');
    });
});
//# sourceMappingURL=loginController.test.js.map