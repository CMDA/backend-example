var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./db');

connection.connect();

express()
  .use(express.static('public'))
  .use(bodyParser.urlencoded({extended: true}))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', movies)
  .post('/', add)
  .get('/:id', movie)
  .delete('/:id', remove)
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
      res.render('detail.ejs', {movie: data[0] || {}});
      next();
    }
  }
}

function add(req, res, next) {
  var movie = req.body;

  connection.query('INSERT INTO movies SET ?', {
    title: movie.title,
    plot: movie.plot,
    description: movie.description
  }, done);

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect('/' + data.insertId);
      next();
    }
  }
}

function remove(req, res, next) {
  connection.query('DELETE FROM movies WHERE id = ?', req.params.id, done);

  function done(err) {
    if (err) {
      next(err);
    } else {
      res.end('OK');
      next();
    }
  }
}
