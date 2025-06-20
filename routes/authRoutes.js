const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { getMe } = require('../controllers/authController');
const authRouter = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

// current user info
authRouter.get('/me', verifyToken, getMe);

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

module.exports = authRouter;


