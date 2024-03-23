const { _getAllUsers, _getAllIngredients, _getAllRecipes } = require('../models/recipmemodels');

const getAllUsers = (req, res) => {
    _getAllUsers()
    .then((data) => {
        res.json(data);
    })
    .catch(err =>{
        console.log(err);
        res.status(404).json({ message: "not found" });
    });
};

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
        res.status(404).json({msg:'404 no user'});
    });
};

module.exports = {
    getAllUsers,
    getAllIngredients,
    getAllRecipes
};
