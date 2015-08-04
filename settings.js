var mongoose = require('mongoose').connect('mongodb://localhost/settingsdb')
  , Setting = require('./model')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, 'connected to database'))

exports.findAll = function(req, res) {
  Setting.find(function (err, settings) {
    if (err) return console.error(err)
    res.header('Content-Type', 'application/json')
    res.send(settings)
  })
}

exports.findByKey = function(req, res) {
  Setting.findOne({ 'key': req.params.key }, 'value', function(err, setting) {
    if (err) return res.sendStatus(500, err)
    if (!setting) return res.sendStatus(404)
    res.header('Content-Type', 'application/json')
    res.send(setting.value)
  })
}

exports.updateSetting = function(req, res) {
  Setting.findOrCreate({ 'key': req.params.key }, 'value', function(err, setting) {
    setting.value = JSON.stringify(req.body)
    setting.save(function (err) {
      if (err) return res.sendStatus(500, err)
      res.sendStatus(200)
    })
  })
}

exports.deleteSetting = function(req, res) {
  Setting.find({ 'key': req.params.key }).remove(function(err) {
    if (err) return res.sendStatus(500, err)
    res.sendStatus(200)
  })
}
