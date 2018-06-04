const Koa = require('koa');
const koaCors = require('koa-cors');
const koaBody = require('koa-body');
const Router = require('koa-router');

// 实例化
const app = new Koa();
app.proxy = true;


const wxInfo = {
  AppID: 'wx30276bec26f80d44',
  AppSecret: '993761dec3dc2654c25e3c9cd72d63be'
};

const port = 80;
const router = new Router();

// 配置koa
app.use(koaCors());
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

router.get('/v1/a', async (ctx) => {
  return 'hello';
});

router.all('*', async (ctx) => {
  ctx.body = 'hjgJKLKVvhgvuvJHBVgyljkb';
});
// 欢迎信息
console.log(`✈️  服务端已启动，监听端口${port}`);
