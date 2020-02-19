// Middleware
const express = require('express');
const session = require('express-session')
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// App setup
const app = express();
app.use(morgan('combine'));
app.use(bodyparser.json());
app.use(cors());

app.use(session({
    name: 'dusko',
    secret: 'amburator',
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 3,
        sameSite: true,
        secure: false,
    }
}));

// Routes
const pcRouter = require('./routes/pc.js');
const classroomRouter = require('./routes/classroom.js');
const profileRouter = require("./routes/profiles.js");

app.use('/pc/', pcRouter);
app.use('/classroom/', classroomRouter);
app.use('/profiles', profileRouter);

// Port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server started on port 4000');
});

// Base
app.get('/status', (req, res) => {
    res.send({ Status: "Online", Hotel: "Trivago" });
});