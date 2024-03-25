const {db} = require('../config/recipmeConnect.js')

const _getAllUsers = ()=> {
    return db('users').select('lastname', 'username', 'email', 'profile_picture_url')
};

const _getAllIngredients = () =>{
    return db('ingredients').select('ingredient_name')
}

const _getAllRecipes = () => { 
    return db('recipes').select('recipe_name')
}

const _getUserById = (id) => {
    return db('users')
    .where(id)
    .select('id', 'first_name', 'last_name', 'username', 'email')
}

const _insertNewUser = (username, email, password_hash, salt, firstname, lastname) =>{
    return db('users').insert({ username, email, password_hash, password_salt:salt, firstname, lastname}, ['*'])
}

const _updateExistingUser = (id, username, email, firstname, lastname) =>{
    return db('users')
    .where({id})
    .update({username, email, firstname, lastname}, ['*'])
}


const _loginUser = (email, password_hash) =>{
    return db('users').where({email, password_hash}).first()
}

// const _insertHashedPassword = (password_hash, username) => {
//     return db('users').insert({password_hash, username},['*']);
// };

const _getUserByUsername = (username) => {
    return db('users').whereILike('username', username)
}


module.exports = {
    _getAllUsers,
    _getAllIngredients,
    _getAllRecipes,
    _getUserById,
    _insertNewUser,
    _updateExistingUser,
    // _insertHashedPassword,
    _loginUser,
    _getUserByUsername
}
