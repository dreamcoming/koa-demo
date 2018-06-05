const Koa = require('koa');
const koaCors = require('koa-cors');
const koaXmlBody = require('koa-xml-body');
const koaBody = require('koa-body');
const Router = require('koa-router');
// const wx = require('wx_op');

// 实例化
const app = new Koa();
app.proxy = true;


// 77586428
// const wxInfo = {
//   AppID: 'wx30276bec26f80d44',
//   AppSecret: '993761dec3dc2654c25e3c9cd72d63be'
// };

// 测试账号
const wxInfo = {
  AppID: 'wx99096baef0e218b8',
  AppSecret: '7de47daa6471cc1443e614d39544dfa6'
};

const port = 80;
const router = new Router();

// 配置koa
app.use(koaCors());
app.use(koaXmlBody());
app.use(koaBody({
  patchNode: true,
  patchKoa: false,
  multipart: true,
  formidable: {
    maxFileSize: 10 * 1024 * 1024,
  },
  strict: false,
}));

app.use(router.routes());
app.use(router.allowedMethods());

router.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${new Date()} : ${ctx.method} ${ctx.url} - ${ms}`);
  console.log(`params: ${JSON.stringify(Object.assign({}, ctx.query))}`);
});

app.listen(port);

router.all('*', async (ctx) => {
  try {
    // 日志
    console.log(`接收到微信推送：${JSON.stringify(ctx.request.body.xml)}`);
  } catch (e) {
    console.log(e);
  }
  ctx.body = ctx.query.echostr || 'hjgJKLKVvhgvuvJHBVgyljkb';
});

// 欢迎信息
console.log(`✈️  服务端已启动，监听端口${port}`);
