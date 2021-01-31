const mongoose = require('mongoose');
const topics = require('./topics');
const Topic = require('../models/topics');

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

const seedDB = async () => {
    await Topic.deleteMany({});
    for(let i=0;i<24;i++) {
        const rand = Math.floor(Math.random()*24);
        const t = new Topic( {
            index: `${topics[rand].index}`,
            topic: `${topics[rand].topic}`
        })
        await t.save();
    }
}

seedDB();