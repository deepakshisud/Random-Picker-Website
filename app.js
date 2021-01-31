const express = require('express');
const mongoose = require('mongoose');
const Topic = require('./models/topics');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/random-topic', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();
app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))


app.get('/', async (req, res) => {
    res.render('home');;
})

app.get('/topics', async (req, res) => {
    const topics = await Topic.find({})
    res.render('topics', {topics});;
})


app.listen(3000, () => {
    console.log("Listening on port 3000!");
})