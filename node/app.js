const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combine'));
app.use(bodyparser.json());
app.use(cors());

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server started on port 4000');
});

app.get('/status', (req, res) => {
    res.send({ Status: "Online", Hotel: "Trivago" });
});