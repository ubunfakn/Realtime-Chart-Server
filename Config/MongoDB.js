const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chart')

const schema = new mongoose.Schema({
    x:Number,
    y:Number
})

const model = mongoose.model('coordinates', schema);

module.exports = model;