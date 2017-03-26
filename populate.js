var request = require('request');
var series = require('run-series');
var connection = require('./db');

connection.connect();

connection.query('DROP TABLE IF EXISTS movies');

connection
  .query(
    'CREATE TABLE IF NOT EXISTS movies (' +
    [
      'id INT NOT NULL AUTO_INCREMENT',
      'title TEXT CHARACTER SET utf8',
      'description TEXT CHARACTER SET utf8',
      'plot TEXT CHARACTER SET utf8',
      'PRIMARY KEY (id)'
    ].join(', ') +
    ')',
    ontable
);

function ontable(err) {
  if (err) {
    throw err;
  }

  request('http://dennistel.nl/movies/', populate);
}

function populate(err, response, body) {
  if (err) {
    throw new Error('Cannot populate: ' + err.stack);
  }

  series(JSON.parse(body).map(insert), oninsert);

  function oninsert(err) {
    if (err) {
      console.error('Could not populate: ' + err.stack);
    } else {
      console.log('Populated database');
    }

    connection.destroy();
  }
}

function insert(movie) {
  return add;

  function add(done) {
    connection.query('INSERT INTO movies SET ?', {
      id: movie.id,
      title: movie.title,
      plot: movie.simple_plot,
      description: movie.plot
    }, done);
  }
}
