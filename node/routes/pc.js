const express = require('express');
const app = express();
const ID = 'PostRouter: ';
const config = require('../db/config.js');
const sql = require('../db/db.js');
const main = require('../app.js');
const mysql = require('mysql');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Prikaz svih ucionica
app.get('/', function(req, res, next) {
    if (main.loggedIn != null) {
        console.log(ID + 'pripremam pretragu svih postova');
        sql.query(mysql.format(config.SQLpcMap.queryAll), function(err, posts) {

            if (err) console.log(ID + "error: ", err);
            else {
                if (posts != null) {
                    toPost = [];
                    posts.forEach(element => {
                        var pc = {
                            id: element.id,
                            name: element.name,
                            room: element.room,
                            invet: element.invet,
                            status: element.status
                        }
                        console.log(ID + 'classroom parsed : ', classroom);
                        toPost.push(pc);
                    });
                    res.render('board.ejs', { toPost });
                }
            }
        });
    } else res.send("401 - nisi se ulogovao");
});

// Dpdavanje novog posta
app.post('/add', function(req, res, next) {
    if (main.loggedIn != null) {
        console.log(ID + 'pripremam dodavanje classrooma');
        sql.query(mysql.format(config.SQLpcMap.insert, [req.body.name]), function(err, resp) {

            if (err) console.log(ID + "error: ", err);

            else res.redirect('/profiles/me/');
        });
    } else res.send("401 - nisi se ulogovao");
});

// Editovanje postova - vracanje
app.get('/edit/(:id)', function(req, res, next) {
    if (main.loggedIn != null) {
        console.log(ID + 'pripremam editovanje classroom-a');
        sql.query(mysql.format(config.SQLpcMap.queryById + req.params.id), function(err, resp) {

            if (err) console.log(ID + "error: ", err);

            else
            if (resp != null) {
                var class1 = {
                    id: resp[0].id,
                    name: resp[0].name
                }
                var jsJeSranje = {
                    id: class1.id,
                    name: class1.name
                }
                console.log(ID + JSON.stringify(jsJeSranje));
                res.render('edit_post.ejs', { post: jsJeSranje });
            }
        });

    } else res.send("401 - nisi se ulogovao");
});

// Editovanje eposta - akcija
app.post('/edit', function(req, res, next) {
    if (main.loggedIn != null) {
        console.log(ID + 'pripremam izmene posta');
        var post = {
            id: req.body.id,
            name: req.body.name,
        }
        sql.query(mysql.format(config.SQLpostMap.update, [post.name]), function(err, resp) {

            if (err) console.log(ID + "error: ", err);
            else {
                console.log(ID + 'izmenio i vracam se na profil')
                res.redirect('/profiles/me/');
            }
        });
    } else res.send("401 - nisi se ulogovao");
});

// Brisanje posta
app.get('/delete/(:id)', function(req, res, next) {
    if (main.loggedIn != null) {
        console.log(ID + 'pripremam brisanje posta');
        sql.query(mysql.format(config.SQLpostMap.delete + req.params.id), function(err, resp) {

            if (err) console.log(ID + "error: ", err);

            else res.redirect('/profiles/me/');

        });
    } else res.send("401 - nisi se ulogovao");
});

// Filtriranje classroma
app.get('/search', function(req, res, next) {
    if (main.loggedIn != null) {
        console.log(ID + 'pripremam filter posta');
        var search = {
            name: req.query.name,
        }
        console.log(ID + req.query.title);

        // Ako je prazan filter
        if (search.name === "") {
            console.log(ID + 'prosli');
            sql.query(mysql.format(config.SQLpostMap.queryAll), function(err, posts) {

                if (err) console.log(ID + "error: ", err);

                else {
                    if (posts != null) {
                        toPost = [];
                        console.log(ID + 'tazim po svemu');
                        posts.forEach(element => {
                            var post = {
                                id: element.id,
                                name: element.name
                            }
                            console.log(ID + 'post parsed : ', post);
                            toPost.push(post);
                        });
                        if (search.from == "p") res.render('profile.ejs', { toPost }, main.css);
                    }
                }
            });
        } else {
            if (search.name !== "") {
                sql.query(mysql.format(config.SQLpostMap.queryByName, [search.name]), function(err, posts) {

                    if (err) console.log(ID + "error: ", err);

                    else {
                        if (posts != null) {
                            toPost = [];
                            console.log(ID + 'tazim po oba: ' + search.title + search.tweet);
                            posts.forEach(element => {
                                var post = {
                                    id: element.id,
                                    name: element.name
                                }
                                console.log(ID + 'post parsed : ', post);
                                toPost.push(post);
                            });
                            if (search.from == "p") res.render('profile.ejs', { posts }, main.css);
                        }
                    }
                });
            }
        }
    } else res.send("401 - nisi se ulogovao");
});

module.exports = app