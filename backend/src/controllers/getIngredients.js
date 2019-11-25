"use strict";
exports.__esModule = true;
var ingredients_1 = require("../placeholder-data/ingredients");
function searchIngredients(req, res) {
    var queryParams = req.query;
    var filter = queryParams.filter || '';
    var sortOrder = queryParams.sortOrder;
    var pageNumber = parseInt(queryParams.pageNumber, 10) || 0;
    var ingredients = Object.values(ingredients_1.placeholderIngredients)
        .sort(function (l1, l2) { return l1.id - l2.id; });
    var pageSize = parseInt(queryParams.pageSize, 10) || ingredients.length;
    if (filter) {
        ingredients = ingredients.filter(function (ingredient) { return ingredient.name.trim().toLowerCase().search(filter.toLowerCase()) >= 0; });
    }
    if (sortOrder === 'desc') {
        ingredients = ingredients.reverse();
    }
    var initialPos = pageNumber * pageSize;
    var ingredientsPage = ingredients.slice(initialPos, initialPos + pageSize);
    // console.log(pageNumber);
    // console.log(pageSize);
    res.status(200).json({ payload: ingredientsPage });
}
exports.searchIngredients = searchIngredients;
function getIngredient(req, res) {
    res.status(200).json({ payload: ingredients_1.placeholderIngredients[1] });
}
exports.getIngredient = getIngredient;
