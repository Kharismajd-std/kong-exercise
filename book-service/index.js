const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');
require('dotenv').config();

function auth(req, res, next) {
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }
    if (user.name === 'admin2' && user.pass === '123456') {
      next();
    } else {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }
}

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let books = [
  {
    'id': 0,
    'author': 'Chinua Achebe',
    'country': 'Nigeria',
    'imageLink': 'images/things-fall-apart.jpg',
    'language': 'English',
    'link': 'https://en.wikipedia.org/wiki/Things_Fall_Apart\n',
    'pages': 209,
    'title': 'Things Fall Apart',
    'year': 1958
  },
  {
    'id': 1,
    'author': 'Hans Christian Andersen',
    'country': 'Denmark',
    'imageLink': 'images/fairy-tales.jpg',
    'language': 'Danish',
    'link': 'https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n',
    'pages': 784,
    'title': 'Fairy tales',
    'year': 1836
  },
  {
    'id': 2,
    'author': 'Dante Alighieri',
    'country': 'Italy',
    'imageLink': 'images/the-divine-comedy.jpg',
    'language': 'Italian',
    'link': 'https://en.wikipedia.org/wiki/Divine_Comedy\n',
    'pages': 928,
    'title': 'The Divine Comedy',
    'year': 1315
  }
]

app.get('/books', auth, (req, res, next) => {
	res.json(books);
});

app.get('/books/:id', auth, (req, res, next) => {
	res.json(books[req.params.id]);
});

app.listen(PORT, () => {
	console.log(`app listen on port ${PORT}`);
});