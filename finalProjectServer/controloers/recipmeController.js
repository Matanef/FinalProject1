const {     _getAllUsers,
    _getAllIngredients,
    _getAllRecipes,
    _getUserById,
    _insertNewUser,
    _updateExistingUser,
    _loginUser,
    _getUserByUsername,
    _deleteuser,
    _addRecipe,
    _deleteRecipe } = require('../models/recipmemodels');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

// const getAllUsers = (req, res) => {
//     _getAllUsers()
//     .then((data) => {
//         const users =  _getAllUsers();
//         res.json(data);
//         console.log(users);
//     })
//     .catch(err =>{
//         console.log(err);
//         res.status(404).json({ message: "not found" });
//     });
// };

const getUserById = (req,res) =>{
    const id = req.params;
    _getUserById(id)
    .then(data => {
        console.log(data);
        res.status(200).json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({ message: "User not found" });
    });
}

const getAllIngredients = (req, res) => {
    _getAllIngredients()
    .then((data) => {
        res.json(data);
    })
    .catch(err =>{
        res.status(404).json({msg:'404 no ingredients'});
    });
};

const getAllRecipes = (req, res) => {
    _getAllRecipes()
    .then((data) => {
        res.json(data);
    })
    .catch(err =>{
        res.status(404).json({msg:'404 no recipe'});
    });
};

const loginUser = async (req,res) =>{
    try {
        //taking information inserted by user from req.body
        const {email,password} = req.body;
        console.log(email);
        const user = await _loginUser(email.toLowerCase(), password);
        console.log(user);
        //check if user exist in users table, if don't exist we get back an empty array
        if(!user){            
            return res.status(404).json({msg: "Email not found"})
        }
        //check password
        console.log(user.password_hash);
        const match = bcrypt.compareSync(password+"", user.password_hash)
        console.log('this means the passwords match -->', match);
        if(!match) {
        return res.status(404).json({msg: "Wrong Password"})
        }

        //token
        const userid = user.id
        const useremail = user.email

        const secret = process.env.ACCESS_TOKEN_SECERT;

        const accessToken = jwt.sign({userid, useremail}, secret, {
            expiresIn: "120s"
        });

        res.cookie("token", accessToken, {
            maxAge: 60 * 1000, 
            httpOnly: true,
        })

        //update user table with this token

        res.json({token:accessToken})
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: "Something went wrong"})
    }

}

const insertNewUser = async (req,res) =>{
    const { username, email, password, firstname, lastname} = req.body;
    const lowerEmail = email.toLowerCase();

    //encrypt the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password + "", salt);

    try {
        const user = await _insertNewUser(username, lowerEmail, hash, salt, firstname,lastname);
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: "email already exist in the system"})
    }
}

const getAllUsers = async (req,res) =>{
    try {
        // console.log(req);
        const users = await _getAllUsers();
        res.json(users)
    }  catch (error) {
        console.log(error);
        res.status(404).json({msg: "not found"})
    }
}

const logout = (req,res) =>{
    //delete cookie from table
    res.clearCookie("token");
    req.userid = null;
    req.useremail = null;
    res.sendStatus(200)
}

const deleteUser = async (req,res) => {
    const { id } = req.params;
    try {
        await _deleteuser(id)
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        console.log('Error ==>', error);
        res.status(500).json({message: "Failed to delete user"})
    }
}

const updateExistingUser = async (req,res) =>{
    const { id } = req.params;
    const {username, email, firstname, lastname} = req.body;
        try {
            if(!id){
                return res.status(400).json({message: "User ID is required"})
            }

            const updatedUser =  await _updateExistingUser(id, username, email, firstname, lastname)
            console.log(updatedUser);
            if(updatedUser.length === 0){
                return res.status(404).json({message: "User not found"})
            }
            res.status(200).json({message: "User updated successfully"})
        } catch (error) {
            console.log('Error ==>', error);
            res.status(500).json({message: "Failed to update user"})
        }
    
}

const addRecipe = async (req,res) => {
    const {recipe_name, recipe_description, recipe_instructions, user_id} = req.body
    try {
        const recipe = await _addRecipe(recipe_name, recipe_description, recipe_instructions, user_id);
        res.json(recipe)
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: "Error in adding recipe"})
    }
}

const deleteRecipe = async (req,res) =>{
    const {recipe_id} = req.body;
    console.log(recipe_id);
    try {
        await _deleteRecipe(recipe_id)
            res.status(200).json({message: 'Recipe deleted'})
        }
    catch (error) {
        console.log(error);
        res.status(404).json({message: 'Recipe Id requierd'})
        
    }
}




module.exports = {
    getAllUsers,
    getAllIngredients,
    getAllRecipes,
    getUserById,
    insertNewUser,
    loginUser,
    deleteUser,
    updateExistingUser,
    addRecipe,
    deleteRecipe
};
