var express = require('express');
var request = require('request');

var host = 'http://dennistel.nl/movies/';

express()
  .use(express.static('public'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', movies)
  .get('/:id', movie)
  .listen(2000);

function movies(req, res, next) {
  request(host, function (err, response, body) {
    if (err) {
      next(err);
    } else {
      res.render('index.ejs', {movies: JSON.parse(body)});
      next();
    }
  });
}

function movie(req, res, next) {
  request(host + req.params.id, function (err, response, body) {
    if (err) {
      next(err);
    } else {
      res.render('detail.ejs', {movie: JSON.parse(body)});
      next();
    }
  });
}
