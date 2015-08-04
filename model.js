var mongoose = require('mongoose')
  , findOrCreate = require('mongoose-findorcreate')

var settingSchema = mongoose.Schema({
  key: String
, value: String
})

settingSchema.plugin(findOrCreate)

module.exports = mongoose.model('Setting', settingSchema)
