const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 主分类模型
const categorySchema = new Schema({
    // category_id: Schema.Types.ObjectId,
    category_id: Number,
    name: String,
    parent_id: Number,
    checkicon: String,
    uncheckicon: String,
    menu: Number
})

mongoose.model('Category', categorySchema);

// 子分类模型
const SubcategorySchema = new Schema({
    description: String,
    displayIndex: Number,
    goods: Array,
    iconList: Array,
    id: Number,
    name: String,
    parentId: Number,
    path: String,
})

mongoose.model('Subcategory', SubcategorySchema);