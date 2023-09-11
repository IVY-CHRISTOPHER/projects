const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./config/mongoose.config');
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json(), express.urlencoded({ extended: true }));

const UserRoutes = require('./routes/user.routes');
const EventRoutes = require('./routes/event.routes');
EventRoutes(app);
UserRoutes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));