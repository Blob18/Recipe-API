const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());

const uri = 'mongodb+srv://catherinedelacruz833:95JEI1j4F9ar6V7y@cluster0.ah1r19i.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

// Routes for recipe management

// Add new recipe
app.post('/recipes', async (req, res) => {
  try {
    const db = client.db('recipeAPI');
    const result = await db.collection('recipes').insertOne(req.body);
    res.json(result.ops[0]);
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all recipes
app.get('/recipes', async (req, res) => {
  try {
    const db = client.db('recipeAPI');
    const recipes = await db.collection('recipes').find({}).toArray();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific recipe
app.get('/recipes/:id', async (req, res) => {
  try {
    const db = client.db('recipeAPI');
    const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(req.params.id) });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a recipe
app.put('/recipes/:id', async (req, res) => {
  try {
    const db = client.db('recipeAPI');
    const result = await db.collection('recipes').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ message: 'Recipe updated successfully' });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a recipe
app.delete('/recipes/:id', async (req, res) => {
  try {
    const db = client.db('recipeAPI');
    const result = await db.collection('recipes').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Post a recipe
app.post ('api/user',(req,res)=>{
  const user ={
    id:dsUsers.length +1,
    name:req.body.name,
  };
  dsUsers.push(User);
  res.send(user);
});

const user = dUser.find((c) => c.id = parseInt (req.params.id));
  if (!user)
  return res.status(400).send('The user with the given ID was not found.');

  const schema = Joi.object({
    name: Joi.stringg().min(3).required(),});
    
    const result = schema.validate(req.body);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }

    user.name = req.body.name;
    res.send(user);
  
