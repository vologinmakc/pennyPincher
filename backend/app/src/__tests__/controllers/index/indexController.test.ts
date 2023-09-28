import request from 'supertest';
import { createConnection, getConnection, EntityManager } from 'typeorm';
import app from '../../../app';
import { ConnectionOptions } from 'typeorm';
import testConfigRaw from '../../../../ormconfig.test.json';

const testConfig: ConnectionOptions = testConfigRaw as any;

let transactionalEntityManager: EntityManager;

beforeAll(async () => {
    const connection = await createConnection(testConfig);
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
    const connection = getConnection();
    await connection.undoLastMigration();
    await getConnection().close();
});

describe('Index Controller', () => {
    it('test Index Controller by auth user', async () => {
        const tokenResponse = await request(app).post('/login').send({
            name: 'admin',
            password: '123456',
        });

        const token = JSON.parse(tokenResponse.text).access_token;

        const response = await request(app)
            .get('/')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
    });
});
