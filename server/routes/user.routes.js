const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.loginUser);
    app.post('/api/logout', UserController.logoutUser);
    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/users/:id', UserController.getOneUser);
}