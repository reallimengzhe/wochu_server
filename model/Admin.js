const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
// 定义管理员模型
const adminSchema = new Schema({
    adminId: Schema.Types.ObjectId,
    adminName: { unique: true, type: String },
    password: String,
    ceateDate: { type: Date, default: Date.now() }
});
// 密码加盐加密
adminSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    })
});
// 校验密码
adminSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err);
            })
        });
    }
};
// 发布模型
mongoose.model('Admin', adminSchema);