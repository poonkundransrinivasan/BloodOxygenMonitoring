// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Import Patient and Physician models
const Patient = require('./models/patient'); // Adjust path as necessary
const Physician = require('./models/physician'); // Adjust path as necessary

// Initialize the express app
const app = express();

// Import controller
const patientController = require('./controller/PatientController');

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB (replace with your database URI)
mongoose.connect('mongodb://localhost:27017/eceFinalProject', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Use patientController for the '/patient' route
app.use('/patient', patientController);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Healthcare API');
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
