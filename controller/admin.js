const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router;

// 注册管理员
router.post('/registAdmin', async ctx => {
    // 获取 model
    const Admin = mongoose.model('Admin');
    // 接收post请求封装成user对象
    let newAdmin = new Admin(ctx.request.body);
    console.log(ctx.request.body);
    // 保存用户信息
    await newAdmin.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        };
    })
});
// 登录管理员
router.post('/loginAdmin', async ctx => {
    // 接收前端发送的数据
    let loginAdmin = ctx.request.body;
    let adminName = loginAdmin.adminName;
    let password = loginAdmin.password;
    // 获取 model
    const Admin = mongoose.model('Admin');
    // 查询用户名是否存在
    await Admin.findOne({ adminName: adminName }).exec().then(async result => {
        if (result) { // 存在
            let newAdmin = new Admin();
            // 校验密码
            await newAdmin.comparePassword(password, result.password).then(isMatch => {
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