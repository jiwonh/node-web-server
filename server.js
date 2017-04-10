const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');
//app.set('views', 'views');
app.use('/', express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.use((req, res, next) => {
  var log = `${new Date().toString()}: ${req.method} ${req.path}\n`
  fs.appendFile('server.log', log)
  console.log(log);
  next();
});

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my website."
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: "About Page"
  });
});

app.get('/project', (req, res) => {
  res.render('project', {
    pageTitle: 'Project Page'
  });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
