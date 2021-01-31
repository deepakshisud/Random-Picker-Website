const mongoose = require('mongoose');

const topicsSchema = new mongoose.Schema( {
    topic: {
        type: String
    }
})

const Topic = mongoose.model('Topic', topicsSchema);

module.exports = Topic;