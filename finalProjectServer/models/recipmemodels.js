const {db} = require('../config/recipmeConnect.js')

const _getAllUsers = ()=> {
    return db('users').select('username', 'email', 'profile_picture_url')
};

const _getAllIngredients = () =>{
    return db('ingredients').select('ingredient_name')
}

const _getAllRecipes = () => { 
    return db('recipes').select('recipe_name')
}




module.exports = {
    _getAllUsers,
    _getAllIngredients,
    _getAllRecipes
}
