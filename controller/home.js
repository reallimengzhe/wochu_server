const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');
let router = new Router();

// 插入轮播图
router.get('/insertCarousel', async ctx => {
  fs.readFile('./data/carousel.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    // console.log(data);
    let count = 0;
    const Carousel = mongoose.model('Carousel');
    data.map((item, index) => {
      console.log(item);
      let carousel = new Carousel(item);
      carousel.name = item.sortIndexDes;
      carousel.img = item.picUrl;
      carousel.save().then(() => {
        count++;
        console.log('成功' + count);
      }).catch(() => {
        console.log('失败');
      })
    })
  });
  ctx.body = '插入轮播图';
});
// 获取轮播图
router.get('/getCarousel', async ctx => {
  const Carousel = mongoose.model('Carousel');
  await Carousel.find().exec().then(res => {
    ctx.body = res;
  })
});
// 插入入口
router.get('/insertEntry', async ctx => {
  fs.readFile('./data/entry.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    // console.log(data);
    let count = 0;
    const Entry = mongoose.model('Entry');
    data.map((item, index) => {
      console.log(item);
      let entry = new Entry(item);
      entry.name = item.posDes;
      entry.img = item.imgUrl;
      entry.link = item.source;
      entry.save().then(() => {
        count++;
        console.log('成功' + count);
      }).catch(() => {
        console.log('失败');
      })
    })
  });
  ctx.body = '插入入口';
});
// 获取入口
router.get('/getActivity', async ctx => {
  const Entry = mongoose.model('Entry');
  await Entry.find({}).sort({ 'pos': 1 }).exec().then(res => {
    ctx.body = res;
  })
});
// 插入主内容
router.get('/insertMain', async ctx => {
  fs.readFile('./data/main.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    // console.log(data);
    let count = 0;
    const Main = mongoose.model('Main');
    data.map((item, index) => {
      // console.log(item);
      let main = new Main(item);
      main.template_type = item.templateType;
      main.sort_index = item.sortIndex;
      main.save().then(() => {
        count++;
        console.log('成功' + count);
      }).catch(() => {
        console.log('失败');
      })
    })
  });
  ctx.body = '插入主内容';
});
// 获取快报
router.get('/getNews', async ctx => {
  const Main = mongoose.model('Main');
  await Main.find({ 'sort_index': 3 }).sort({ 'pos': 1 }).exec().then(res => {
    ctx.body = res;
  })
});
// 获取广告
router.get('/getAd', async ctx => {
  const Main = mongoose.model('Main');
  await Main.find({ 'sort_index': 4 }).sort().exec().then(res => {
    ctx.body = res;
  })
});
// 获取限时促销
router.get('/getPromotion', async ctx => {
  const Main = mongoose.model('Main');
  await Main.find({ 'sort_index': 5 }).exec().then(res => {
    ctx.body = res;
  })
});
router.get('/getPromotionChild', async ctx => {
  const Main = mongoose.model('Main');
  await Main.find({ 'sort_index': 6 }).sort({ 'pos': 1 }).exec().then(res => {
    ctx.body = res;
  })
});
// 获取秒变大厨
router.get('/getCook', async ctx => {
  const Main = mongoose.model('Main');
  await Main.find({ 'sort_index': 10 }).exec().then(res => {
    ctx.body = res;
  })
});
router.get('/getCookChild', async ctx => {
  const Main = mongoose.model('Main');
  await Main.find({ 'sort_index': 11 }).sort({ 'pos': 1 }).exec().then(res => {
    ctx.body = res;
  })
});
// 获取商品列表
router.get('/getProductList', async ctx => {
  const Main = mongoose.model('Main');
  await Main.find({
    $or: [
      { "template_type": "4" }, { "template_type": "7", }
    ]
  }).sort({ 'sort_index': 1 }).exec().then(res => {
    ctx.body = res;
  })
});

module.exports = router;