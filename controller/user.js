const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router;
// 注册
router.post('/signUp', async ctx => {
    // 获取 model
    const User = mongoose.model('User');
    // 接收post请求封装成user对象
    let newUser = new User(ctx.request.body);
    // 保存用户信息
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: "注册失败：当前手机号已注册",
        };
        console.log(err)
    })
});
// 登录
router.post('/signIn', async ctx => {
    // 接收前端发送的数据
    let signIn = ctx.request.body;
    let user = signIn.user;
    let password = signIn.password;
    // 获取 model
    const User = mongoose.model('User');
    // 查询用户名是否存在
    await User.findOne({ user: user }).exec().then(async result => {
        if (result) { // 存在
            let newUser = new User();
            await newUser.comparePassword(password, result.password).then(isMatch => {
                // 密码匹配 - 登录成功
                if (isMatch) {
                    ctx.body = {
                        code: 200,
                        message: '登录成功',
                        userInfo: result
                    }
                } else { // 密码不匹配
                    ctx.body = {
                        code: 201,
                        message: '密码错误'
                    }
                }
            })
        } else { // 不存在
            ctx.body = {
                code: 202,
                message: '用户名不存在'
            }
        }
    })

})

module.exports = router;