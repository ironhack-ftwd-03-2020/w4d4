const express = require('express');
const app = express();

// add these two lines to be able to use partials
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

const allMovies = require('./movies.json');

app.use(express.static('public'));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', { movies: allMovies });
});

app.get('/godfather', (req, res) => {
    const godfather = allMovies.find(movie => movie.title === 'The Godfather');
    console.log(godfather);
    res.render('movie', { movie: godfather });
});

app.listen(3000);