/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('recipeAPI'); // Replace with your desired database name

// Insert a few documents into the recipes collection.
db.getCollection('recipes').insertMany([
  {
    'title': 'Chicken Adobo',
    'ingredients': ['1 kg chicken pieces', '1 cup soy sauce', '1 cup vinegar', '5 cloves garlic', '3 bay leaves', '1 tsp peppercorns'],
    'instructions': '...',
    'tags': ['Lunch', 'Dinner', 'Filipino']
  },
  {
    'title': 'Sinigang na Baboy',
    'ingredients': ['500g pork ribs', '1 large onion', '2 tomatoes', '1 eggplant', '2 radishes', 'Tamarind mix', 'Salt and pepper'],
    'instructions': '...',
    'tags': ['Lunch', 'Dinner', 'Filipino', 'Soup']
  },
  // Add more recipes as needed
]);

// Run a find command to view recipes with the tag 'Filipino'.
const filipinoRecipes = db.getCollection('recipes').find({
  tags: 'Filipino'
}).toArray();

// Print a message to the output window.
console.log('Filipino Recipes:', filipinoRecipes);

// Here we run an aggregation to get the total
