const fs = require('fs');
const csv = require('csv-parser');
const Recipe = require('../models/Recipe'); // Your Mongoose model

const dotenv = require('dotenv').config({ path: '../.env' }); // Adjust the path as needed

// dotenv.config(); // Load environment variables from a `.env` file
const connectDB = require('../config/db');
// Connect to MongoDB
connectDB();


const cleanIngredients = (rawIngredients) => {
    return rawIngredients
        .replace(/[\[\]'"\*\*\*]/g, '') // Remove brackets, single quotes, and double quotes
        .split(',') // Split into an array based on commas
        .map(item => item.trim()) // Trim spaces from each ingredient
        .filter(item => item); // Remove any empty strings
};

// Function to read CSV file and save the recipes to the database
const readAndSaveCSV = async (filePath) => {
    const recipes = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            const recipe = {
                title: row.title,
                link: row.url,
                image: row.img,
                ingredients: cleanIngredients(row.ingredients) // Assuming ingredients are separated by commas
            };
            recipes.push(recipe);
        }).on('end', async () => {
            console.log(recipes);
        })
        .on('end', async () => {
            // Now save the recipes to the database
            try {
                for (let recipe of recipes) {
                    const newRecipe = new Recipe(recipe);
                    await newRecipe.save();
                }
                console.log('All recipes saved successfully!');
            } catch (error) {
                console.error('Error saving recipes:', error);
            }
        });
};

readAndSaveCSV("../uploads/recipes.csv");

// const testRecipe = new Recipe({
//     title: 'Test Recipe',
//     link: 'http://example.com',
//     image: 'http://example.com/image.jpg',
//     ingredients: ['ingredient1', 'ingredient2'],
//   });
  
// testRecipe.save().then(() => {
// console.log('Test recipe saved');
// });
  

module.exports = { readAndSaveCSV };
