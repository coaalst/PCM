const express = require('express');
const bodyparser = require('body-parser');
const Joi = require('joi');
const ID = 'ProfileRouter: ';

// Sema za validaciju
const schema = {
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
}

// DB setup
const config = require('../db/config.js');
const sql = require('../db/db.js');
const mysql = require('mysql');

const app = express();
app.use(bodyparser.json());

// Logovanje, dodavanje novog korisnika
app.post('/login', function(req, res) {
        const r = JSON.stringify(req.session);
        console.log(ID + r);
        console.log(ID + r.userId);
        var user = {
            name: req.body.name,
            password: req.body.password
        }
        console.log(ID + 'pripremam pretragu korisnika');
        console.log(ID + 'trazim korisnika: ' + JSON.stringify(user));
        sql.query(mysql.format(config.SQLuserMap.queryByCred, [user.name, user.password]), function(err, col) {

            if (err) console.log(ID + "error: ", err);

            else {
                console.log(ID + "u bazi ima: ", JSON.stringify(col));
                if (col.length != 0) {

                    var parse = {
                        id: col[0].id,
                        type: col[0].type,
                        name: col[0].name,
                        password: col[0].password,
                    }

                    console.log(ID + 'korisnik : ', parse);
                    console.log(ID + 'korisnik id parsed : ', parse.id);
                    req.session.sessionID = parse.id;
                    console.log(ID + 'novi sesn id : ', req.session.userId);
                    res.sendStatus(200);
                } else res.sendStatus(406);
            }
        });
});

// Registracija, dodavanje novog korisnika
app.post('/register', function(req, res) {
        const { error, value } = Joi.validate(req.body, schema);
        if (error) {
            console.log(ID + 'Validacija nije prosla');
            switch (error.details[0].context.key) {
                case 'name':
                    console.log(ID + 'Uneto ime nije validno.');
                    res.status(400).send({ error: 'Uneto ime nije validno' });
                    break;

                case 'password':
                    console.log(ID + 'Sifra nije validna.');
                    res.status(400).send({ error: 'Sifra ne odgovara pravilima.' });
                    break

                default:
                    console.log(ID + 'Greska pri unosu podataka.');
                    res.status(400).send({ error: 'Greska pri unosu podataka.' });
                    break
            }
        } else {
            console.log(ID + 'Validacija prosla');
            var user = {
                name: req.body.name,
                password: req.body.password
            }
            console.log(ID + 'pripremam pretragu korisnika');
            console.log(ID + 'trazim korisnika: ' + JSON.stringify(user) + 'iz req:' + req.body.name);
            sql.query(mysql.format(config.SQLuserMap.queryByCred, [user.name, user.password]), function(err, col) {

                if (err) console.log(ID + "error: ", err);

                else {
                    if (col.length === 0) {
                        sql.query(mysql.format(config.SQLuserMap.insert, ['user', user.name, user.password]), function(err, col) {});
                        sql.query(mysql.format(config.SQLuserMap.queryByCred, [user.name, user.password]), function(err, col) {
                            if (col.length !== 0) {
                                var parse = {
                                    id: col[0].id,
                                    type: col[0].type,
                                    name: col[0].name,
                                    password: col[0].password,
                                }
                                console.log(ID + 'korisnik registrovan: ', parse);
                                req.session.sessionID = parse.id;
                                res.sendStatus(200);
                            } else {
                                console.log(ID + 'korisnik nije registrovan: ', JSON.stringify(parse));
                                res.sendStatus(409);
                            }
                        });
                    } else {
                        console.log(ID + "u bazi vec ima: ", JSON.stringify(col));
                        res.sendStatus(409);
                    }
                }
            });
        }
});

// Logout
app.post('/logout', function(req, res) {
    if (req.session.sessionID) {
        req.session.destroy(err => {
            if (err) res.sendStatus(409);
        });
        res.clearCookie(req.app.get('dusko'));
        res.sendStatus(200);
    } else res.sendStatus(409);
});

module.exports = app;
