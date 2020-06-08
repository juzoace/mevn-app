const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

// Initialize the app 
const app = express();

const db = 'mongodb+srv://Uzochukwu:juzoboss98@application-j1cdp.azure.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => { 
    console.log(`Unable to connect with the database ${err}`)
});

// Load the models
require('./models/user');

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Json Body Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cors Middleware
app.use(cors());

// // Give access to the variables set in the process.env
// require('dotenv').config();
console.log('worked')
// Setting up static directories
app.use(express.static(path.join(__dirname, 'public')));

// Bring in the Users route
app.use(require('./routes'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server stared on port ${PORT}`);
})