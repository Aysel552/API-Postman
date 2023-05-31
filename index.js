const express = require ('express');
const app = express();
const recipes = require('./Recipes');

//1st SOLUTION WITH USING BODY-PARSER (For POST Request)
// const bodyParser = require('body-parser'); 

// app.use(bodyParser.urlencoded({extended:false})); 
// app.use(bodyParser.json());


//2ND SOLUTION: Using EXPRESS (For POST Request)

app.use(express.urlencoded({extended:true}));
app.use(express.json());



console.log(recipes);

// GET Request to get / obtain smth
app.get("/api/recipes", function(req,res){
    res.json(recipes);
})

//POST Request - to create smth
app.post("/api/recipes",function(req,res){
    const newRecipe = {
        name: req.body.name,
        category: req.body.category,
        time: req.body.time
    }
    recipes.push(newRecipe);
    res.json(recipes);
})

// DELETE Request -  Delete a concrete recipe

app.delete('/api/recipes/:name', function(req,res){
    let { name } = req.params;
    let recipeToBeDeleted = recipes.find(recipe => recipe.name === name);

    if(recipeToBeDeleted) {
        res.json({
            message:"Recipe deleted",
            recipes:recipes.filter(recipe => recipe.name !== name)
        })
    }
    else{
        res.status(404)
        .json({message: `Recipe you are looking for doesn't exist`});
    }
})


// PUT Request -to change smth in the existing recipe:

app.put("/api/recipes/:name", function(req,res){
    let { name } = req.params;
    let recipeToBeUpdated = recipes.find(recipe => recipe.name === name);

    if(recipeToBeUpdated){
        const updateRecipe = req.body;
        recipes.forEach(recipe =>{
            if(recipe.name === req.params.name){
                recipe.name = updateRecipe ? updateRecipe.name : recipe.name;
                res.json({message: "Recipe Updated", recipe})
            }
        })
    }
    else{
        res.status(404)
        .json({message:`Recipe you are looking for ${req.params.name} doesn't exist`})
    }
})



app.listen(3000, function(){
    console.log("IT'S WORKING - PORT 3000");
});
