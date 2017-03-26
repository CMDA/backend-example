var express = require('express');
var connection = require('./db');

connection.connect();

express()
  .use(express.static('public'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', movies)
  .get('/:id', movie)
  .listen(2000);

function movies(req, res, next) {
  connection.query('SELECT * FROM movies', done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('index.ejs', {movies: data});
      next();
    }
  }
}

function movie(req, res, next) {
  connection.query('SELECT * FROM movies WHERE id = ? LIMIT 1', req.params.id, done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('detail.ejs', {movie: data[0]});
      next();
    }
  }
}
