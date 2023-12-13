const mongoose = require('mongoose')

const schemae = mongoose.Schema

const crudSchema = schemae({
    name:{type:String},
    email:{type:String},
    age:{type:Number},
    image:[{type:String}],
    document:[{type:String}],
    isDeleted:{type:Boolean,enum:[true,false],default:false}
    
},{
    timestamps:true,
    versionkey:true
})

module.exports = mongoose.model('crud',crudSchema)