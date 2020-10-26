const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  first_name: {type: String,required: true},
  last_name: {type: String,required: true},
  nickname: {type: String, unique: true, required: true},
  email: {type: String, unique:true, required: true},
  phone_number: {type: String, unique:true},
  password: {type: String,required: true},
  age: {type: Number},
  rank: {type: Number},
  level: {type: Number},
  exp: {type: Number},
  favorite_sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport', 
    required: true
  },
  skins: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skins', 
    required: true
  }
}, {
  collection: 'users',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
