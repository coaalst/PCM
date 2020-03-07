const express = require('express');
const app = express();
const ID = 'PcRouter: ';
const config = require('../db/config.js');
const sql = require('../db/db.js');
const mysql = require('mysql');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Prikaz svih ucionica
app.get('/', function(req, res, next) {
    if (req.session.sessionID) {
        console.log(ID + 'pripremam pretragu svih postova');
        sql.query(mysql.format(config.SQLpcMap.queryAll), function(err, posts) {

            if (err) console.log(ID + "error: ", err);
            else {
                if (posts != null) {
                    posts.forEach(element => {
                        var pc = {
                            id: element.id,
                            name: element.name,
                            room: element.room,
                            invet: element.invet,
                            status: element.status
                        }
                        console.log(ID + 'classroom parsed : ', pc);
                    });
                    res.json(posts)
                }
            }
        });
    } else res.sendStatus(401);
});

// Dpdavanje novog racunara
app.post('/add', function(req, res, next) {
    if (req.session.sessionID) {
        console.log(ID + 'pripremam dodavanje racunara');
        sql.query(mysql.format(config.SQLpcMap.insert, [req.body.name, req.body.room, req.body.invet, req.body.status]), function(err, resp) {

            if (err) console.log(ID + "error: ", err);

            else res.sendStatus(200);
        });
    } else res.sendStatus(401);
});

// Editovanje eposta - akcija
app.post('/edit', function(req, res, next) {
    if (req.session.sessionID) {

        pc = req.body;
        console.log(ID + 'pripremam izmene posta');
        console.log(ID + JSON.stringify(pc));
        sql.query(mysql.format(config.SQLpcMap.update, [pc.name, pc.room, pc.invet, pc.status, pc.id]), function(err, resp) {
            if (err) console.log(ID + "error: ", err);
            else {
                res.sendStatus(200);
            }
        });
    } else res.sendStatus(401);
});

// Brisanje posta
app.post('/delete', function(req, res, next) {
    if (req.session.sessionID) {
        console.log(ID + 'pripremam brisanje posta');
        sql.query(mysql.format(config.SQLpcMap.delete, req.body.id), function(err, resp) {

            if (err) console.log(ID + "error: ", err);

            else res.sendStatus(200);

        });
    } else res.sendStatus(401);
});

module.exports = app
