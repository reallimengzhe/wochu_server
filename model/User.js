const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
// 定义用户模型
const userSchema = new Schema({
    userId: Schema.Types.ObjectId,
    ceateDate: { type: Date, default: Date.now() + 28800000 },
    user: { unique: true, type: String },
    password: String,
});
// 注册 - 密码加盐加密
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    })
});
// 登录 - 校验密码
userSchema.methods = {
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
mongoose.model('User', userSchema);