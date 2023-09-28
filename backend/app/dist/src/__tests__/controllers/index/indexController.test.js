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
let transactionalEntityManager;
beforeAll(async () => {
    const connection = await (0, typeorm_1.createConnection)(testConfig);
    await connection.dropDatabase();
    await connection.runMigrations();
    transactionalEntityManager = connection.createEntityManager();
});
beforeEach(async () => {
    await transactionalEntityManager.query('BEGIN');
});
afterEach(async () => {
    await transactionalEntityManager.query('ROLLBACK');
});
afterAll(async () => {
    const connection = (0, typeorm_1.getConnection)();
    await connection.undoLastMigration();
    await (0, typeorm_1.getConnection)().close();
});
describe('Index Controller', () => {
    it('test Index Controller by auth user', async () => {
        const tokenResponse = await (0, supertest_1.default)(app_1.default).post('/login').send({
            name: 'admin',
            password: '123456',
        });
        const token = JSON.parse(tokenResponse.text).access_token;
        const response = await (0, supertest_1.default)(app_1.default)
            .get('/')
            .set('Authorization', `Bearer ${token}`)
            .send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
    });
});
//# sourceMappingURL=indexController.test.js.map