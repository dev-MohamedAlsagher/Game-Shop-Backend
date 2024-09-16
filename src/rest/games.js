const Router = require('@koa/router');
const gamesService = require('../service/games');
const Joi = require('joi');
const validate = require('../core/validation');

const getAllGames = async (ctx) => {
  try {
    const games = await gamesService.getAllGames();
    ctx.body = games;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Error while fetching games' };
  }
};

getAllGames.validationScheme = {};

/**
 * Install users routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = function installGamesRoutes(app) {
  const router = new Router({
    prefix: '/games',
  });

  router.get('/',validate(getAllGames.validationScheme), getAllGames);
  
  app.use(router.routes())
     .use(router.allowedMethods());
};
