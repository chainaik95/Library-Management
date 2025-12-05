const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({
title: {type:String,required:true},
authors: {type:[String],required:true},
isbn: {type:String, required:true, unique:true},
publisher: {type:String} ,
publishedDate: {type:Date} ,
category: {type:String} ,
totalCopies: {type:String,default: 1} ,
availableCopies: {type:String,default: 1}
},{timestamps:true});


//have to change below line to model export

module.exports = mongoose.model('Books', bookSchema);
