const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router;
// 新建地址
router.post('/newAddress', async ctx => {
    // 获取 model
    const Address = mongoose.model('Address');
    // 接收post请求封装成user对象
    let newAddress = new Address(ctx.request.body);
    // 保存用户信息
    await newAddress.save().then(() => {
        ctx.body = {
            code: 200,
            message: '添加成功'
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: "添加失败",
        };
        console.log(err)
    })
});
// 读取地址列表
router.get('/getAddress', async ctx => {
    const Address = mongoose.model('Address');
    // 联合查询
    // await Cart.find({ userId: ctx.query.userId }).populate({ path: 'productId', model: 'Product' }).exec().then(res => {
    //     ctx.body = res;
    // })
    await Address.find({ user: ctx.query.user }).exec().then(res => {
        ctx.body = res;
    })
});
module.exports = router;