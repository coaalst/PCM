// Middleware
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// App setup
const app = express();
app.use(morgan('combine'));
app.use(bodyparser.json());
app.use(cors());

// Routes
//const postRouter = require('./routes/posts.js');
const profileRouter = require("./routes/profiles.js");
//app.use('/posts/', postRouter);
app.use('/profiles/', profileRouter);

// Port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server started on port 4000');
});

// Base
app.get('/status', (req, res) => {
    res.send({ Status: "Online", Hotel: "Trivago" });
});