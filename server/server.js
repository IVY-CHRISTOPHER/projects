const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./config/mongoose.config');
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json(), express.urlencoded({ extended: true }));
const port = 8000;
const UserRoutes = require('./routes/user.routes');
const EventRoutes = require('./routes/event.routes');
EventRoutes(app);
UserRoutes(app);

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

// use my database and create a socket connection
const User = require('./models/user.model');
const Message = require('./models/messages.model');
var users = []
let messages = [];

io.on("connection", socket => {
    // each client that connects gets a unique socket id
    // if this is logged in our terminal is means a new client
    // has successfully made a socket connection
    console.log(socket.id);
    socket.on('Sign In', (data) => {
        console.log("Backend Data - ",data);
        users.push({username: data, id: socket.id});
        io.emit('new user', {users: users, messages: messages});
    });

    socket.on('send message', (data) => {
        messages.push(data);
        io.emit('new message', messages);
    });

    socket.on('disconnect', () => {
        users = users.filter(user => user.id !== socket.id);
        io.emit('user disconnected', socket.id);
    });
});
