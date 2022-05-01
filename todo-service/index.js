const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');
require('dotenv').config();

function auth(req, res, next) {
    var user = basicAuth(req);
    console.log(user);
    if (!user || !user.name || !user.pass) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }
    if (user.name === 'admin1' && user.pass === '123456') {
      return next();
    } else {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }
}

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let todos = [
  {'id': 1, 'title': 'Todo 1', 'completed': false},
  {'id': 2, 'title': 'Todo 2', 'completed': false},
  {'id': 3, 'title': 'Todo 3', 'completed': false}
];

app.get('/todos', auth, (req, res, next) => {
	res.json(todos);
});

app.get('/todos/:id', auth, (req, res, next) => {
	res.json(todos[req.params.id]);
});

app.listen(PORT, () => {
	console.log(`app listen on port ${PORT}`);
});