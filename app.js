const express = require('express');
const mongoose = require('mongoose');
const Topic = require('./models/topics');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

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
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {
    res.render('home');
})

app.get('/topic', (req, res) => {
    res.render('topics');
})

app.post('/', async(req,res) => {
    const t = req.body.topic;
    console.log(t);
    const topic = await Topic.findOne(t);
    console.log(topic);
    res.send("worked");
})


app.listen(3000, () => {
    console.log("Listening on port 3000!");
})