import { calculateDiscount } from './src/utils'
import app from './src/app'
import request from 'supertest'

describe('App', () => {
    it('should return the discount', () => {
        const discount = calculateDiscount(100, 10)
        expect(discount).toBe(10)
    })

    it('should return 200 status code', async () => {
        const res = await request(app).get('/').send()

        expect(res.statusCode).toBe(200)
    })
})
