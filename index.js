const Koa = require('koa');
const path = require('path');
const route = require('koa-route');
const serve = require('koa-static');

const app = new Koa();

// 解决跨域问题
const cors = require('koa2-cors');
app.use(cors({
    // origin: ['http://localhost:8080'],
    origin: ['*'],
    credentials: true
}));

// 1.主页静态网页
const dist = serve(path.join(__dirname) + '/dist/');
app.use(dist);
// const view = serve(path.join(__dirname) + '/view/');
// app.use(view);

// 解析前端 post请求
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 加载路由
const Router = require('koa-router');
let router = new Router;

router.use('/home', require('./controller/home.js').routes());
router.use('/category', require('./controller/category.js').routes());
router.use('/product', require('./controller/product.js').routes());
router.use('/cart', require('./controller/cart.js').routes());
router.use('/user', require('./controller/user.js').routes());
router.use('/address', require('./controller/address.js').routes());
router.use('/admin', require('./controller/admin.js').routes());

app.use(router.routes());
app.use(router.allowedMethods());

const { connect, initSchemas } = require('./init.js');
(async () => {
    await connect();
    initSchemas();
})();

app.use(async ctx => {
    ctx.body = 'hello koa';
});
// 监听 3000 端口
app.listen(3000, () => {
    console.log('服务器已启动 http://localhost:3000');
});