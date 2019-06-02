const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs'); // file system
let router = new Router();

// 插入商品数据
router.get('/insertProduct', async ctx => {
    fs.readFile('./data/product.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        // console.log(data);
        let count = 0;
        const Product = mongoose.model('Product');
        data.map((value, inedx) => {
            // console.log(value);
            let product = new Product(value);
            product.save().then(() => {
                count++;
                console.log('成功' + count);
            }).catch(err => {
                console.log('失败' + err);
            })
        })
    })
    ctx.body = '导入商品'
});
// 获取商品详情
router.get('/getDetail', async ctx => {
    const Product = mongoose.model('Product');
    await Product.findOne({ goodsGuid: ctx.query.id }).exec().then(res => {
        ctx.body = res;
    })
})
// 通过分类获取商品列表
router.get('/getProductsByType', async ctx => {
    const Product = mongoose.model('Product');
    await Product.find({ type: ctx.query.category_type }).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then(res => {
        ctx.body = res;
    })
});
module.exports = router;