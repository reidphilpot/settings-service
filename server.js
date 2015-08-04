var express = require('express')
  , bodyParser = require('body-parser')
  , settings = require('./settings')

var app = express()
app.use(bodyParser.json())
app.get('/settings', settings.findAll)
app.get('/settings/:key', settings.findByKey)
app.put('/settings/:key', settings.updateSetting)
app.listen(3000)

console.log('Listening on port 3000')
