import { Router } from 'express';
import { createToken } from './helpers/index.js';
import { User } from '../models/index.js';
const router = Router();
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = createToken(user.id);
        res.cookie('token', token, {
            httpOnly: true
        });
        res.json({
            user
        });
    }
    catch (error) {
        console.log('register error', error);
        res.status(403).json({
            user: null,
            message: 'Registration failed. Please try again.'
        });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email
        }
    });
    if (!user) {
        res.status(403).json({
            user: null,
            message: 'No user found with that email address'
        });
    }
    else {
        const valid_pass = user.validatePassword(password);
        if (!valid_pass) {
            res.status(403).json({
                user: null,
                message: 'Your password is invalid'
            });
            return;
        }
        const token = createToken(user.id);
        res.cookie('token', token, {
            httpOnly: true
        });
        res.json({
            user
        });
    }
});
export default router;
