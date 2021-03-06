'use strict'
const ejs = require('ejs')
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const valid = require('express-validator');
const crypto = require('crypto');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(valid())
app.use(session({
  secret: 'kms',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))


// models

var indexModel = require('./models/index')
var userModel = require('./models/user')
var carModel = require('./models/car')

//router

var indexRouter = require('./routers/index')
var profilesRouter = require('./routers/profile')
var carRouter = require('./routers/car')
var adminRouter = require('./routers/admin')

app.use('/', indexRouter)

app.use((req, res, next) => {
  if (req.session.user) {
    next()
  }
  else {
    res.sendStatus(403)
  }
})

app.use('/profile', profilesRouter)
app.use('/cars', carRouter)
app.use('/admin', adminRouter)







app.listen(process.env.PORT || 3000);
