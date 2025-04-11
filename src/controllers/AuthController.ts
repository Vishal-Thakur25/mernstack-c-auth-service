import { Response } from 'express';
import { RegisterUser } from '../types';
import { UserService } from '../services/UserService';

export class AuthController {
    constructor(private userService: UserService) {
        this.userService = userService;
    }

    async register(req: RegisterUser, res: Response) {
        const { firstName, lastName, password, email } = req.body;

        await this.userService.create({ firstName, lastName, email, password });

        res.status(201).json();
    }
}
