const mongoose = require('mongoose');

// Define the recipe schema
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String },
    ingredients: { type: [String], required: true },
});

// Export the Recipe model
module.exports = mongoose.model('Recipe', recipeSchema);
