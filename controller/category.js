const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');
let router = new Router();
// 插入分类
router.get('/insertCategories', async ctx => {
    fs.readFile('./data/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        // console.log(data);
        let count = 0;
        const Category = mongoose.model('Category');
        data.map((value, index) => {
            // console.log(value);
            let category = new Category(value);
            category.category_id = value.id;
            category.parent_id = value.parentId;

            category.save().then(() => {
                count++;
                console.log('成功' + count);
            }).catch(err => {
                console.log(err);
            })
        })
    });
    ctx.body = '插入分类';
});
// 获取父分类
router.get('/getCategories', async ctx => {
    const Category = mongoose.model('Category');
    await Category.find({ menu: 1 }).sort({ 'category_id': 1 }).exec().then(res => {
        ctx.body = res;
    })
});
// 获取子分类
router.get('/getSubCategories', async ctx => {
    const Product = mongoose.model('Category');
    await Product.find({ parent_id: ctx.query.parent_id }).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then(res => {
        ctx.body = res;
    })
});
// 插入子分类商品
router.get('/insertSubCategories', async ctx => {
    fs.readFile('./data/Subcategory.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        // console.log(data);
        let count = 0;
        const Subcategory = mongoose.model('Subcategory');
        data.map((value, index) => {
            // console.log(value);
            let category = new Subcategory(value);
            category.save().then(() => {
                count++;
                console.log('成功' + count);
            }).catch(err => {
                console.log(err);
            })
        })
    });
    ctx.body = '插入分类';
});
// 获取子分类商品
router.get('/getSubCategoriesProducts', async ctx => {
    console.log(ctx.query);
    const Category = mongoose.model('Subcategory');
    await Category.find({ parentId: ctx.query.parent_id }).sort({ 'id': 1 }).exec().then(res => {
        ctx.body = res;
    })
});

module.exports = router;