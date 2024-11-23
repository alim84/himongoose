const mongoose = require('mongoose')


let hiSchema= new mongoose.Schema({
    name:{
        type: 'string'
    }
})

module.exports=mongoose.model('hi', hiSchema)