import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { UserData } from '../types';
import createHttpError from 'http-errors';
import { Roles } from '../constants';
import bcrypt from 'bcrypt';

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        const saltRounds = 10;
        /// Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await this.userRepository.findOne({
            where: { email: email },
        });

        if (user) {
            const err = createHttpError(400, 'Email already exist');
            throw err;
        }

        try {
            const user = await this.userRepository.save({
                firstName,
                lastName,

                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            });
            return user;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            const error = createHttpError(
                500,
                'Failed to store data in database',
            );

            throw error;
        }
    }
}
