const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carouselSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    img: String
})

mongoose.model('Carousel', carouselSchema);