const Router = require('@koa/router');
const installUsersRouter = require('./users');
const installBestellingRouter = require ('./bestelling');
const installGamesRoutes = require ('./games');
const installHealthRoutes = require("./health");




/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'https://gamestart.onrender.com');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    await next();
  });

  installUsersRouter(router);
  installBestellingRouter(router);
  installGamesRoutes(router);
  installHealthRoutes(app);



  app.use(router.routes())
     .use(router.allowedMethods());
};
