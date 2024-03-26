const {    getAllUsers,
    getAllIngredients,
    getAllRecipes,
    getUserById,
    insertNewUser,
    loginUser,
    updateExistingUser,
    deleteUser,
    addRecipe, 
    deleteRecipe } = require('../controloers/recipmeController')
const verifyToken = require('../middlewares/verifyToken')
const express = require('express');

const router = express.Router();
router.get('/users', getAllUsers)
router.get('/ingredients', getAllIngredients)
router.get('/recipes', getAllRecipes)
router.get('/:id', getUserById);
router.post('/register', insertNewUser)
router.post('/login', loginUser)
router.post('/recipes', addRecipe)
router.delete('/recipes/:id', deleteRecipe)
router.delete('/:id', deleteUser)
router.put('/:id', updateExistingUser)
router.get('/verify', verifyToken, (req,res) =>{

    // res.sendStatus(200)

    const userid = req.userid
    const useremail = req.useremail

    const secret = process.env.ACCESS_TOKEN_SECERT;

    const accessToken = jwt.sign({userid, useremail}, secret, {
        expiresIn: "60s"
    });

    res.cookie("token", accessToken, {
        maxAge: 60 * 1000, 
        httpOnly: true,
    })

    //update user table with this token

    res.json({token:accessToken})
})


module.exports = router