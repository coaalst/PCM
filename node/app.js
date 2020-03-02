// Middleware
const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const SQLiteStore = require('connect-sqlite3')(session);
const app = express();

// App setup
app.use(morgan('combine'));
app.use(bodyparser.json());
app.use(cors());

app.use(session({
    store: new SQLiteStore,
    name: 'dusko',
    secret: 'amburator',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

// Routes
const pcRouter = require('./routes/pc.js');
const classroomRouter = require('./routes/classroom.js');
const profileRouter = require("./routes/profiles.js");

app.use('/pc/', pcRouter);
app.use('/classroom/', classroomRouter);
app.use('/profiles/', profileRouter);

// Port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server started on port 4000');
});
