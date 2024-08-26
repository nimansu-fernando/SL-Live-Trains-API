const authController = require('../controllers/auth-controller');
const authService = require('../services/auth-service');

jest.mock('../services/auth-service');

describe('Auth Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
        next = jest.fn();
    });

    describe('login', () => {
        it('should return a token if credentials are valid', async () => {
            req.body = { username: 'user', password: 'pass' };
            const token = 'valid-token';
            authService.login.mockResolvedValue(token);

            await authController.login(req, res);

            expect(authService.login).toHaveBeenCalledWith('user', 'pass');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token });
        });

        it('should return 401 if credentials are invalid', async () => {
            req.body = { username: 'user', password: 'wrongpass' };
            authService.login.mockResolvedValue(null);

            await authController.login(req, res);

            expect(authService.login).toHaveBeenCalledWith('user', 'wrongpass');
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });

        it('should handle errors', async () => {
            req.body = { username: 'user', password: 'pass' };
            const error = new Error('Internal server error');
            authService.login.mockRejectedValue(error);

            await authController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });

    describe('register', () => {
        it('should register a user successfully', async () => {
            req.body = { username: 'user', password: 'pass' };
            authService.register.mockResolvedValue(true);

            await authController.register(req, res);

            expect(authService.register).toHaveBeenCalledWith('user', 'pass');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
        });

        it('should return 400 if registration fails', async () => {
            req.body = { username: 'user', password: 'pass' };
            authService.register.mockResolvedValue(false);

            await authController.register(req, res);

            expect(authService.register).toHaveBeenCalledWith('user', 'pass');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Registration failed' });
        });

        it('should handle errors', async () => {
            req.body = { username: 'user', password: 'pass' };
            const error = new Error('Internal server error');
            authService.register.mockRejectedValue(error);

            await authController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });
});
