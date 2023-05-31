const express = require ('express');
const app = express();
const books = require('./Books');


app.get('/api/books', function(req,res){
    res.json(books);
})


app.listen(3000, function(){
    console.log("Books - PORT 3000")
})