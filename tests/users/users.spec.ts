import { DataSource } from 'typeorm';
import app from '../../src/app';
import { User } from '../../src/entity/User';
import request from 'supertest';
import { AppDataSource } from '../../src/config/data-source';
import { Roles } from '../../src/constants';

describe('POST /auth/register', () => {
    let connection: DataSource;

    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });
    // DataBase truncate
    beforeEach(async () => {
        await connection.dropDatabase();
        await connection.synchronize();
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
            // expect(users[0].password).toBe(userData.password);
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

        it('should assign a customer role', async () => {
            const userData = {
                firstName: 'Vishal',
                lastName: 'Singh',
                email: 'vishal@gmail.com',
                password: '123456',
            };

            await request(app).post('/auth/register').send(userData);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users[0]).toHaveProperty('role');
            expect(users[0].role).toBe(Roles.CUSTOMER);
        });

        it('should store the hashed password in database', async () => {
            const userData = {
                firstName: 'Vishal',
                lastName: 'Singh',
                email: 'vishal@gmail.com',
                password: '123456',
            };

            await request(app).post('/auth/register').send(userData);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            console.log(users[0].password);

            expect(users[0].password).not.toBe(userData.password);

            expect(users[0].password).toHaveLength(60);
            expect(users[0].password).toMatch(/^\$2b\$\d+\$/);
        });
        it('should return 400 status if email already exist in database', async () => {
            const userData = {
                firstName: 'Vishal',
                lastName: 'Singh',
                email: 'vishal@gmail.com',
                password: '123456',
            };

            const userRepository = connection.getRepository(User);

            await userRepository.save({
                ...userData,
                role: Roles.CUSTOMER,
            });

            // const existingEmail = await users.findOne({
            //     where: { email: userData.email },
            // });

            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            // if (existingEmail) {
            //     throw createHttpError(400, 'Email already exists');
            // }

            const users = await userRepository.find();

            expect(response.statusCode).toBe(400);

            expect(users).toHaveLength(1);
        });
    });

    describe('Fieds are missing', () => {
        it('should return 400 status code if email field is missing', async () => {
            const userData = {
                firstName: 'Vishal',
                lastName: 'Singh',
                email: '',
                password: '123456',
            };

            const response = await request(app)
                .post('/auth/register')
                .send(userData);

            console.log(response.body);

            expect(response.statusCode).toBe(400);

            const userRepository = connection.getRepository(User);

            const users = await userRepository.find();

            expect(users).toHaveLength(0);
        });
    });
});
