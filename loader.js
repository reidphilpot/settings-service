var mongoose = require('mongoose').connect('mongodb://localhost/settingsdb')
  , Setting = require('./model')
  , data = require('./data.json')

var collection = mongoose.connection.collections.settings

if (collection) {
  collection.drop(function(err) {
    if (err) return console.log('settings collection could not be dropped', err)
    console.log('settings collection dropped')
  })
}

Setting.create(data, function(err) {
  if (err) return console.log("could not create teams collection", err)
  console.log('settings collection created')
  process.exit()
})
