const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 购物车商品模型
const cartSchema = new Schema({
    user: String, // 用户 ID
    goodsGuid: { unique: true, type: String, dropDups: true }, // 商品自带 ID
    picUrl: String, // 缩略图
    goodsName: String, // 商品名称
    price: Number, // 商品现价
    marketPrice: Number, // 商品原价
    count: Number, // 数量
    createDate: { type: Date, default: Date.now() + 28800000 }, // 日期
});

mongoose.model('Cart', cartSchema);

// 购物车推荐商品
const RecommendSchema = new Schema({
    goodsGuid: String,
    goodsName: String,
    price: Number,
    marketPrice: Number,
    picUrl: String,
});

mongoose.model('Recommend', RecommendSchema);