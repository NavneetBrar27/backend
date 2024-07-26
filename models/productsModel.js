const mongoose = require('mongoose')

const Schema = mongoose.Schema

//structure of item in database
const ProductSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    initialPrice: {type: Number},
    newPrice: {type: Number},
    description: {type: String},
    tag: {type: String},
    likes: {type: Number, default: 0}

}, {timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)

