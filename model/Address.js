const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    // userId: Schema.Types.ObjectId, // 用户ID
    user: String, // 用户ID
    addressDetail: String, // 小区或写字楼
    areaCode: String,  // 区域码
    city: String, // 市
    county: String, // 区
    isDefault: Boolean, // 是否默认
    name: String, // 收件人
    province: String, // 省/直辖市
    tel: String, // 电话
    address: String, // 电话
    id: Number
})

mongoose.model('Address', addressSchema);






