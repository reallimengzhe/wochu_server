const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: Schema.Types.ObjectId,
    goodsGuid: String,
    imgLoop: Array,
    goodsName: String,
    description: String,
    price: Number,
    marketPrice: Number,
    shelfLife: String,
    specification: String,
    origin1: String,
    storageCondition: String,
    descriptionDetail: Array,
    goodsStock: Number,
    picUrl: String,
    goodsLabel: Object

});

mongoose.model('Product', productSchema);