const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs'); // file system
let router = new Router();
// 添加购物车
router.post('/addToCart', async ctx => {
    const Cart = mongoose.model('Cart');
    const cart = new Cart(ctx.request.body);
    // console.log(ctx.request.body);
    await cart.save().then(() => {
        ctx.body = {
            code: 200,
            message: '添加成功'
        }
    }).catch(err => {
        if (err.code == 11000) { // 如果商品已存在，则数量进行增加
            // 查询当前商品现有数量
            Cart.find({ user: ctx.request.body.user, goodsGuid: ctx.request.body.goodsGuid }).exec().then(res => {
                const count = res[0].count;
                // 在当前基础增加
                Cart.find({ user: ctx.request.body.user })
                    .updateOne({ goodsGuid: ctx.request.body.goodsGuid }, { $set: { count: ctx.request.body.count + count } })
                    .exec();
            })
            ctx.body = {
                code: 201,
                message: '添加成功'
            }
        }
    })
});
// 读取购物车
router.get('/getCart', async ctx => {
    const Cart = mongoose.model('Cart');
    // 联合查询
    // await Cart.find({ userId: ctx.query.userId }).populate({ path: 'productId', model: 'Product' }).exec().then(res => {
    //     ctx.body = res;
    // })
    await Cart.find({ user: ctx.query.user }).exec().then(res => {
        ctx.body = res;
    })
});
// 改变数量
router.post('/changeCount', async ctx => {
    const Cart = mongoose.model('Cart');
    // console.log(ctx.request.body);
    await Cart.find({ user: ctx.request.body.user }).updateOne({ 'productId': ctx.request.body.productId }, { $set: { 'count': ctx.request.body.count } }).then(() => {
        ctx.body = {
            code: 200,
            message: '数量改变成功'
        }
    }).catch(err => {
        console.log(err);
        ctx.body = {
            code: 500,
            message: '数量改变失败'
        }
    })
});
// 删除购物车
router.post('/delCartItem', async ctx => {
    const Cart = mongoose.model('Cart');
    // console.log(ctx.request.body);
    await Cart.deleteOne(ctx.request.body).then(() => {
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }).catch(err => {
        console.log(err);
        ctx.body = {
            code: 500,
            message: '删除失败'
        }
    })

});
// 插入购物车推荐商品数据
router.get('/insertRecommend', async ctx => {
    fs.readFile('./data/CartRecommend.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let count = 0;
        const Recommend = mongoose.model('Recommend');
        data.map((value, inedx) => {
            let recommend = new Recommend(value);
            recommend.save().then(() => {
                count++;
                console.log('成功' + count);
            }).catch(err => {
                console.log('失败' + err);
            })
        })
    })
    ctx.body = '导入购物车推荐商品'
});
// 获取购物车推荐商品数据
router.get('/getCartRecommend', async ctx => {
    const Recommend = mongoose.model('Recommend');
    await Recommend.find().exec().then(res => {
        ctx.body = res;
    })
});
module.exports = router;