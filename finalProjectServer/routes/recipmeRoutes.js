const {getAllUsers, getAllIngredients, getAllRecipes} = require('../controloers/recipmeController')
const express = require('express');

const router = express.Router();
router.get('/users', getAllUsers)
router.get('/ingredients', getAllIngredients)
router.get('/recipes', getAllRecipes)


module.exports = router