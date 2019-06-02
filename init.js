const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/wochu';
// 引入 Schema
const glob = require('glob');
const path = require('path');
exports.initSchemas = () => {
    glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require);
};
exports.connect = () => {
    // 数据库连接
    mongoose.connect(db, { useNewUrlParser: true });
    // 监听连接 - 连接成功
    mongoose.connection.once('open', () => {
        console.log('Mongodb 已连接');
    });
    // 监听连接 - 连接断开
    mongoose.connection.on('disconnect', () => {
        mongoose.connect(db);
    });
    // 监听连接 - 连接错误
    mongoose.connection.on('error', err => {
        mongoose.connect(db);
        console.log(err);
    });
}