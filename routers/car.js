'use strict'
var express = require('express')
var router = express.Router()
var session = require('express-session')

var model = require('../models')

router.get('/', (req, res) => {
  model.Bridge.findAll({
      include: [model.Car, model.User]
    })
    .then(car => {
      res.render('cars', {
        dataMobil: car
      })
    })
})



router.get('/connect', (req, res) => {
  model.Car.findAll({
      order: [['brand', 'ASC']]
    })
    .then(car => {
      model.User.findAll({
          order: [['name', 'ASC']]
        })
        .then(user => {
          res.render('car', {
            dataMobil: car,
            dataUser: user
          })
        })
    })
})

router.post('/connect', (req, res) => {
  model.Bridge.create(({
      UserId: req.body.userId,
      CarId: req.body.mobilId,
      status: true,
      uangMuka: req.body.muka,
      cicilan: req.body.cicil,
      link_gambar: req.body.link,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    .then(() => {
      res.redirect('/cars')
    })
})

module.exports = router
