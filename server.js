const express = require ("express");
const app = express();
const items = require("./Items");


app.get("/api/items", function(req,res){
    res.json(items);  
})

app.listen(3000, function(){
    console.log("It's working - PORT 3000")
})

