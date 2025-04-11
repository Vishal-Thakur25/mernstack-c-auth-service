import app from '../../src/app';
import request from 'supertest';

describe('POST /auth/register', () => {
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
        });
    });

    describe('Fieds are missing', () => {});
});
