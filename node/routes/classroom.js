const express = require('express');
const app = express();
const ID = 'ClassroomRouter: ';
const config = require('../db/config.js');
const sql = require('../db/db.js');
const mysql = require('mysql');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Prikaz svih ucionica
app.get('/', function(req, res, next) {
    if (req.session.sessionID) {
        console.log(ID + 'pripremam pretragu svih postova');
        sql.query(mysql.format(config.SQLpostMap.queryAll), function(err, posts) {

            if (err) console.log(ID + "error: ", err);
            else {
                if (posts != null) {
                    posts.forEach(element => {
                        var classroom = {
                            id: element.id,
                            name: element.name
                        }
                        console.log(ID + 'classroom parsed : ', classroom);
                    });
                    res.send(posts);
                }
            }
        });
    } else res.sendStatus(401);
});

// Dpdavanje novog posta
app.post('/add', function(req, res, next) {
    if (req.session.sessionID) {
        console.log(ID + 'pripremam dodavanje classrooma');
        sql.query(mysql.format(config.SQLpostMap.insert, [req.body.name]), function(err, resp) {

            if (err) console.log(ID + "error: ", err);

            else res.sendStatus(200);
        });
    } else res.sendStatus(401);
});

// Editovanje eposta - akcija TODO
app.post('/edit', function(req, res, next) {
    if (req.session.sessionID) {
        console.log(ID + 'pripremam izmene posta');
        var post = {
            id: req.body.id,
            name: req.body.name,
        }
        sql.query(mysql.format(config.SQLpostMap.update, [post.name, post.id]), function(err, resp) {

            if (err) console.log(ID + "error: ", err);
            else {
                console.log(ID + 'izmenio i vracam se na profil')
                res.sendStatus(200);
            }
        });
    } else res.send("401 - nisi se ulogovao");
});

// Brisanje posta
app.post('/delete', function(req, res, next) {
    if (req.session.sessionID) {
        console.log(ID + 'pripremam brisanje posta');
        sql.query(mysql.format(config.SQLpostMap.delete + req.body.id), function(err, resp) {

            if (err) console.log(ID + "error: ", err);

            else res.sendStatus(200);
        });
    } else res.send("401 - nisi se ulogovao");
});


module.exports = app;
