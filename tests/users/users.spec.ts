import { DataSource } from 'typeorm';
import app from '../../src/app';
import { User } from '../../src/entity/User';
import request from 'supertest';
import { AppDataSource } from '../../src/config/data-source';
import truncatetables from './utils/index';

describe('POST /auth/register', () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });
    // DataBase truncate
    beforeEach(async () => {
        await truncatetables(connection);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    describe('Given all Fields', () => {
        it('should return 201 status code', async () => {
            // AAA
            // Arrange
            const userData = {
                firstName: 'Vishal',
                lastName: 'Singh',
                email: 'vishal@gmail.com',
                password: '123456',
            };

            // Act

            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            // Assert

            expect(response.statusCode).toBe(201);
        });

        it('should return user data in json format', async () => {
            // AAA
            // Arrange
            const userData = {
                fisrtName: 'Vishal',
                lastName: 'Singh',
                email: 'vishal@gmail.com',
                password: '123456',
            };

            // Act
            const res = await request(app)
                .post('/auth/register')
                .send(userData);

            // Assert
            expect(
                (res.headers as Record<string, string>)['content-type'],
            ).toEqual(expect.stringContaining('json'));
        });

        it('should persist user data in database', async () => {
            // AAA
            // Arrange
            const userData = {
                firstName: 'Vishal',
                lastName: 'Singh',
                email: 'vishal@gmail.com',
                password: '123456',
            };

            // Act

            await request(app).post('/auth/register').send(userData);

            // Assert

            const userRepository = connection.getRepository(User);

            const users = await userRepository.find();

            expect(users).toHaveLength(1);
            expect(users[0].firstName).toBe(userData.firstName);
            expect(users[0].lastName).toBe(userData.lastName);
            expect(users[0].email).toBe(userData.email);
            expect(users[0].password).toBe(userData.password);
        });

        it('should return the id of the user', async () => {
            // Arrange
            const userData = {
                firstName: 'Vishal',
                lastName: 'Singh',
                email: 'vishal@gmail.com',

                password: '123456',
            };

            // Act
            const res = await request(app)
                .post('/auth/register')
                .send(userData);

            // Assert
            // expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
        });
    });

    describe('Fieds are missing', () => {});
});
