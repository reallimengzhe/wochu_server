const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainSchema = new Schema({
    id: Schema.Types.ObjectId,
    items: Object,
    template_type: String,
    sort_index: Number
})

mongoose.model('Main',mainSchema);