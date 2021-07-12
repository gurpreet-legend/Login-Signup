const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const fs = require("fs");
const port = 80;

//BACK-END STUFF :


//MONGOOSE RELATED STUFF
mongoose.connect('mongodb://localhost:27017/Login-Signup', {useNewUrlParser: true, useUnifiedTopology: true});

//Testing connection with the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are successfully connected.")
  
  const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    age: Number,
    gender: String,
    address: String,
    more: String
  });
});

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For setting source of static files
app.use('/scripts', express.static('scripts')) // For setting source of scripts
// app.use(express.urlencoded())
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


//SERVING PAGES

// ENDPOINTS
app.get('/', (req, res)=>{
    res.status(200).render('index.pug');
    // res.status(200).send(fs.readFileSync('/views/index.pug'));
})
app.get('/welcome', (req, res)=>{
    res.status(200).render('welcome_page.pug');
    // res.status(200).send(fs.readFileSync('/views/welcome_page.pug'));
})

app.post('/', (req, res)=>{
    // email = req.body.email;
    // username = req.body.name;
    // age = req.body.age;
    // gender = req.body.gender;
    // address = req.body.address;
    // more = req.body.more;
    // data = `{"email":"${email}", "username":"${username}", "age":"${age}", "gender":"${gender}", "address":"${address}", "more":"${more}"}`;

    console.log(typeof(req.body))
    console.log(req.body)
    res.end();

})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});