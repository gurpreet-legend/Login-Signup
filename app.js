const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const fs = require("fs");
const port = 80;

//MONGOOSE RELATED STUFF
mongoose.connect('mongodb+srv://gurpreet_legend:toinfinity2701@cluster0.4pmy1.mongodb.net/UserDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//Testing connection with the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We are successfully connected.")

    //Creating the Schema
    const userSchema = new mongoose.Schema({
        email: String,
        username: String,
        age: Number,
        gender: String,
        address: String,
        more: String
    });
    // Compiling the schema into a model  
    const user = mongoose.model('user', userSchema);

    app.post('/', (req, res) => {
        let newUser = new user;
        newUser.email = req.body.signup_email;
        newUser.username = req.body.signup_name;
        newUser.age = req.body.signup_age;
        newUser.gender = req.body.signup_gender;
        newUser.address = req.body.signup_address;
        newUser.more = req.body.signup_more;

        //Saving the newUser data in the database
        newUser.save().then(() => {
            res.send("This user data has been saved to the database")
        }).catch(() => {
            res.status(400).send("User data was not saved to the database")
        })


    });
});


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For setting source of static files
app.use('/scripts', express.static('scripts')) // For setting source of scripts

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())


// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('index.pug');
})

app.get('/welcome', (req, res) => {
    res.status(200).render('welcome_page.pug');
})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});