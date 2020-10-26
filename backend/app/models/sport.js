const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  sport:{type: String, required:true},
  image_event: {type: String},
  active: {type: Boolean, default: true }
}, {
  collection: 'sport',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
