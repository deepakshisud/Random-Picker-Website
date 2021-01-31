const express = require('express');
const mongoose = require('mongoose');
const Topic = require('./models/topics');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/booksApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo Connection open");
    })
    .catch(err => {
        console.log("Mongo Error detected");
        console.log(err);
    })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))


app.get('/', async (req, res) => {
    const topics = await Topic.find({})
    res.render('index', {topics});;
})



app.listen(3000, () => {
    console.log("Listening on port 3000!");
})