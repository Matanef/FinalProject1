const {db} = require('../config/recipmeConnect.js')

const _getAllUsers = ()=> {
    return db('users').select('lastname', 'username', 'email', 'profile_picture_url')
};

const _getAllIngredients = () =>{
    return db('ingredients').select('ingredient_name')
}

const _getAllRecipes = () => { 
    return db('recipes').select('recipe_id', 'recipe_name', "recipe_description")
}

const _getUserById = (id) => {
    return db('users')
    .where(id)
    .select('user_id', 'first_name', 'last_name', 'username', 'email')
}

const _insertNewUser = (username, email, password_hash, salt, firstname, lastname) =>{
    return db('users').insert({ username, email, password_hash, password_salt:salt, firstname, lastname}, ['*'])
}

const _updateExistingUser = (id, username, email, firstname, lastname) =>{
    console.log(username);
    return db('users')
    .where({ user_id: id })
    .update({
      email: email,
      username: username,
      firstname: firstname,
      lastname: lastname
    })
  }


const _loginUser = (email) =>{
    return db('users').where({email}).first()
}


const _getUserByUsername = (username) => {
    return db('users').whereILike('username', username)
}

const _deleteuser = (id) =>{
    return db('users').where({user_id: id}).del()
}

const _addRecipe = (recipe_name, recipe_description, recipe_instructions, user_id) =>{
    return db('recipes').insert({
        recipe_name: recipe_name,
        recipe_description: recipe_description,
        recipe_instructions: recipe_instructions,
        user_id: user_id})
}

const _deleteRecipe = (id) =>{
    return db('recipes').where({recipe_id: id}).del()
}

const _editRecipe = (recipe_id, recipe_name, recipe_description, recipe_instructions) => {
    console.log(recipe_id, recipe_name);
    return db('recipes')
    .where({recipe_id: recipe_id})
    .update({        
        recipe_name: recipe_name,
        recipe_description: recipe_description,
        recipe_instructions: recipe_instructions,
    })
}


module.exports = {
    _getAllUsers,
    _getAllIngredients,
    _getAllRecipes,
    _getUserById,
    _insertNewUser,
    _updateExistingUser,
    _deleteuser,
    _loginUser,
    _getUserByUsername,
    _addRecipe,
    _deleteRecipe,
    _editRecipe
}
