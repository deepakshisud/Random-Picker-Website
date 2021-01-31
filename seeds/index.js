const mongoose = require('mongoose');
const topics = require('./topics');
const Topic = require('../models/topics');

mongoose.connect('mongodb://localhost:27017/safety-pin', {
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
    for(let i=0;i<25;i++) {
        const rand = Math.floor(Math.random()*25);
        const t = new Topic( {
            name: `${topics[rand].topic}`,
        })
        await t.save();
    }
}

seedDB();