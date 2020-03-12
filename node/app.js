// Middleware
const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// App setup
app.use(morgan('combine'));
app.use(bodyparser.json());
app.use(cors());

app.use(session({
    secret: 'amburator',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 30 * 60 * 1000, // duration of the cookie in milliseconds, defaults to duration above
        ephemeral: false, // when true, cookie expires when the browser closes
        httpOnly: true, // when true, cookie is not accessible from javascript
        secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
    }
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