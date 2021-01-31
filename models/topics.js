const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicsSchema = new Schema( {
    topic: String
})

module.exports = mongoose.model('Topic', topicsSchema);