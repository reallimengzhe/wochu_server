const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    img: String,
    link: String,
    pos: Number,
})

mongoose.model('Entry', entrySchema);