
import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';
import app from '../../../app';
import { ConnectionOptions } from 'typeorm';
import testConfigRaw from '../../../../ormconfig.test.json';

const testConfig: ConnectionOptions = testConfigRaw as any;
beforeAll(async () => {
    const connection = await createConnection(testConfig);
    // Удалить базу данных
    await connection.dropDatabase();

    await connection.runMigrations();
});

afterAll(async () => {
    const connection = getConnection();

    await connection.undoLastMigration();

    await getConnection().close();
});

describe('Login Controller', () => {
    it('should authenticate user with valid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                name: 'admin',
                password: '123456',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token');
    });

    it('should not authenticate user with invalid credentials', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                name: 'admin',
                password: 'wrongpassword',
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Неверные данные пользователя');
    });
});
