const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema and model for the data
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const User = mongoose.model('User', UserSchema);

// API endpoint to handle form submission
app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    const user = new User({ name, email });
    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
