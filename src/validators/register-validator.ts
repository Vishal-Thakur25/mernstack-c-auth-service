import { checkSchema } from 'express-validator';

export default checkSchema({
    email: {
        errorMessage: 'Email is Required',
        notEmpty: true,
    },
    // password: {
    //     isLength: {
    //         options: { min: 8 },
    //         errorMessage: 'Password should be at least 8 chars',
    //     },
    // },
});

// const registerValidator = [
//     body('email').notEmpty().withMessage('Email is required'),
// ];

// export default registerValidator;
