const Router = require('@koa/router');
const bestellingService = require('../service/bestelling');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const Joi = require('joi');
const Role = require('../core/roles');
const validate = require('../core/validation');


/*
 POSTMAN TEST BODY
{
  "games": [{
      "gameID": 1,
      "quantity": 1,
      "price": 39.99
  },
  {
      "gameID": 2,
      "quantity": 1,
      "price": 20
  }, {
      "gameID": 3,
      "quantity": 1,
      "price": 20
  }
  ],
    "betaalmethode": "bancontact",
    "totaalbedrag": 79.99
}
*/
const getAllBestellingen = async (ctx) => {
  try {
    const { userId } = ctx.state.session;
    const bestellingen = await bestellingService.getAllById(userId);
    ctx.status = 200;
    ctx.body = bestellingen;
  } catch (error) {
    if (error instanceof PermissionError) {
      ctx.status = 403;
      ctx.body = { message: 'Permission denied' };
    } else {
      ctx.status = 500;
      ctx.body = { message: 'An error occurred while fetching bestellingen' };
    }
  }
};

getAllBestellingen.validationScheme = {};

const getAllBestellingenById = async (ctx) => {
  try {
    const { roles } = ctx.state.session;
    if (roles.includes(Role.ADMIN)) {
      const requestedUserId = ctx.params.id;
      const bestellingen = await bestellingService.getAllById(requestedUserId);
      ctx.status = 200;
      ctx.body = bestellingen;
    } else {
      ctx.status = 403;
      ctx.body = { message: 'Permission denied' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'An error occurred while fetching bestellingen' };
  }
};

getAllBestellingenById.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};


const createBestelling = async (ctx) => {
  try {
  const userID = ctx.state.session.userId;
  const {games, betaalmethode, totaalbedrag} = ctx.request.body;

  const bestellingID = await bestellingService.createBestelling(userID, games, betaalmethode, totaalbedrag);
  
  ctx.status = 201;
  ctx.body = {id: bestellingID};
  } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { message: 'An unexpected error occurred' };
    }
}

createBestelling.validationScheme = {
  body: {
    games: Joi.array().items(
      Joi.object({
        gameID: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().positive().required(),
        price: Joi.number().positive().required(),
      })
    ).required(),
    betaalmethode: Joi.string().max(15).required(),
    totaalbedrag: Joi.number().positive().required(),
  },
};


/**
 * Install users routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/bestelling',
  });

  const requireAdmin = makeRequireRole(Role.ADMIN);

  router.get('/', requireAuthentication,validate(getAllBestellingen.validationScheme) , getAllBestellingen);

  router.get('/:id', requireAuthentication, requireAdmin,validate(getAllBestellingenById.validationScheme) , getAllBestellingenById);

  router.post('/', requireAuthentication,validate(createBestelling.validationScheme) , createBestelling);

  app.use(router.routes())
     .use(router.allowedMethods());
};
