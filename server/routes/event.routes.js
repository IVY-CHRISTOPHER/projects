const EventController = require('../controllers/Event.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/events', EventController.findAllEvents);
    app.get('/api/events/:id', EventController.findOneEvent);
    app.post('/api/events', authenticate, EventController.createEvent);
    app.patch('/api/events/:id', EventController.updateEvent);
    app.delete('/api/events/:id', EventController.deleteEvent);
}