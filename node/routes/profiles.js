const express = require('express');
const bodyparser = require('body-parser');
const Joi = require('joi');
const ID = 'ProfileRouter: ';

// Sema za validaciju
const schema = {
    name: Joi.string().required(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8, 32}$')).required(),
};

// DB setup
const config = require('../db/config.js');
const sql = require('../db/db.js');
const main = require('../app.js');
const mysql = require('mysql');

const app = express();
app.use(bodyparser.json());

// Logovanje, dodavanje novog korisnika
app.post('/login', function(req, res) {
    if (!(JSON.stringify(req.session).userId)) res.redirect('http://localhost:8080/#/main');
    else {
        console.log(ID + JSON.stringify(req.session));

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
                    req.session.userId = parse.id;
                    res.redirect('http://localhost:8080/#/main');

                } else res.render('auth.ejs', { logTitle: "Greska, nema tog korisnika u bazi..pokusajte ponovo!", regTitle: "Register" })
            }
        });
    }
});

// Registracija, dodavanje novog korisnika
app.post('/register', function(req, res) {
    if (!(JSON.stringify(req.session).userId)) res.redirect('http://localhost:8080/#/main')
    else {
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
            var user = {
                name: req.body.name,
                password: req.body.password
            }
            console.log(ID + 'pripremam pretragu korisnika');
            console.log(ID + 'trazim korisnika: ' + JSON.stringify(user));
            sql.query(mysql.format(config.SQLuserMap.queryByCred, [user.name, user.password]), function(err, col) {

                if (err) console.log(ID + "error: ", err);

                else {
                    if (col.length == 0) {
                        sql.query(mysql.format(config.SQLuserMap.insert, [user.name, user.password]), function(err, col) {
                            console.log(ID + 'korisnik : ', JSON.stringify(col) + ' registrovan.');
                        });
                        sql.query(mysql.format(config.SQLuserMap.queryByCred, [user.name, user.password]), function(err, col) {
                            var parse = {
                                id: col[0].id,
                                type: col[0].type,
                                name: col[0].name,
                                password: col[0].password,
                            }
                            console.log(ID + 'korisnik registrovan: ', parse);
                            console.log(ID + 'korisnik id parsed : ', loggedIn.id);
                            req.session.userId = parse.id;
                            res.redirect('http://localhost:8080/#/main');
                        });
                    } else {
                        console.log(ID + "u bazi ima: ", JSON.stringify(col));
                        res.render('auth.ejs', { logTitle: "Login", regTitle: "Greska, vec postoji takav korisnik" });
                    }
                }
            });
        }
    }
});

app.post('/logout', function(req, res) {
    req.session.userId = null;
    res.redirect('http://localhost:8080/#/login');
});
module.exports = app;