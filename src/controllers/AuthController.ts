import { NextFunction, Response } from 'express';
import { RegisterUser } from '../types';
import { UserService } from '../services/UserService';
import { Logger } from 'winston';
import { validationResult } from 'express-validator';

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {
        this.userService = userService;
    }

    async register(req: RegisterUser, res: Response, next: NextFunction) {
        const { firstName, lastName, password, email } = req.body;

        // if (!email) {
        //     const err = createHttpError(400, 'Email is required');
        //     next(err);
        //     return;
        // }

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({
                errors: result.array(),
            });
        }

        this.logger.debug('New request to register a user', {
            firstName,
            lastName,
            email,
            password: '*****',
        });

        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });

            this.logger.info('User has been Registered', { id: user.id });

            res.status(201).json({ id: user.id });
        } catch (err) {
            next(err);
            return;
        }
    }
}
