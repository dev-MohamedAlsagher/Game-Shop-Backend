const Router = require("@koa/router");
const usersRepo = require("../repository/users");
const Joi = require("joi");
const validate = require("../core/validation");
const userService = require("../service/users");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Roles = require("../core/roles");


/*
POSTMAN TEST USER
{
   "email": "user2@hotmail.com",
    "password": "12345678"
}

postman test register
{
  "name": "mohamed",
  "lastName": "alsagher",
  "dateOfBirth": "2000-01-17",
  "username": "testUsername",
  "email": "user5@hotmail.com",
  "password": "12345678"
}
*/

const login = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const token = await userService.login(email, password);
    ctx.body = token;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { message: error.message };
  }
};

login.validationScheme = {
  body: {
    email: Joi.string().email(),
    password: Joi.string(),
  },
};

const register = async (ctx) => {
  try {
    const token = await userService.register(ctx.request.body);
    ctx.body = token;
    ctx.status = 201;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { message: error.message };
  }
};

register.validationScheme = {
  body: {
    username: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    name: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    dateOfBirth: Joi.date().iso().required(),
  },
};

const getUser = async (ctx) => {
  try {
    const { userId } = ctx.state.session;

    const user = await userService.getUserById(userId);

    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 404;
      ctx.body = { message: "User not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error fetching user data" };
  }
};

getUser.validationScheme = {};

const getAllUsers = async (ctx) => {
  try {
    const users = await userService.getAllUsers();
    ctx.body = users;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error fetching users data" };
  }
};

getAllUsers.validationScheme = {};


const getUserById = async (ctx) => {
  try {
    const user = await userService.getUserById(Number(ctx.params.id));
    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 404;
      ctx.body = { message: "User not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error fetching user data" };
  }
};

getUserById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  }),
};

const updateUser = async (ctx) => {
  const { userId } = ctx.state.session;
  const userUpdates = ctx.request.body;

  try {
      const updatedUser = await userService.updateUser(userId, userUpdates);
      if (updateUser){
      ctx.status = 200;
      ctx.body = updatedUser;
    } else {
      ctx.status = 400;
      ctx.body = { message: "The givin email already exists" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error updating user" };
  }
};

updateUser.validationScheme = {
  body: {
    name: Joi.string().max(255).optional(),
    lastName: Joi.string().max(255).optional(),
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
  },
};

const updateUserByID = async (ctx) => {
  const userIdToUpdate = ctx.params.id;
  const userUpdates = ctx.request.body;

  try {
    const updatedUser = await userService.updateUser(userIdToUpdate, userUpdates);
    if (updatedUser) {
      ctx.status = 200;
      ctx.body = updatedUser;
    } else {
      ctx.status = 404;
      ctx.body = { message: "User not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error updating user" };
  }
};

updateUserByID.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    name: Joi.string().max(255).optional(),
    lastName: Joi.string().max(255).optional(),
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
  },
};

const deleteUser = async (ctx) => {
  const { userId, roles } = ctx.state.session;

  if (roles.includes(Roles.USER)) {
    const deletedUser = await userService.deleteUser(userId);
    if (deletedUser) {
      ctx.status = 200;
      ctx.body = { message: "User deleted" };
    } else {
      ctx.status = 404;
      ctx.body = { message: "User not found" };
    }
  } else {
    ctx.status = 403;
    ctx.body = { message: "Permission denied" };
  }
};

deleteUser.validationScheme = {};

const deleteUserByID = async (ctx) => {
  const { roles } = ctx.state.session;
  const targetUserId = Number(ctx.params.id);
  if (roles.includes(Roles.ADMIN)) {
    const deletedUser = await userService.deleteUser(targetUserId);
    if (deletedUser) {
      ctx.status = 200;
      ctx.body = { message: "User deleted" };
    } else {
      ctx.status = 404;
      ctx.body = { message: "User not found" };
    }
  } else {
    ctx.status = 403;
    ctx.body = { message: "Permission denied" };
  }
};

deleteUserByID.validationScheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
};

/**
 * Install users routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = function installUsersRoutes(app) {
  const router = new Router({
    prefix: "/users",
  });

  router.post("/login", validate(login.validationScheme), login);

  router.post("/register", validate(register.validationScheme), register);

  const requireAdmin = makeRequireRole(Roles.ADMIN);

  router.get("/", requireAuthentication, async (ctx, next) => {
    if (ctx.state.session.roles.includes(Roles.ADMIN)) {
      await getAllUsers(ctx, next);
    } else {
      await getUser(ctx, next);
    }
  });

  router.get(
    "/:id",
    requireAuthentication,
    requireAdmin,
    validate(getUserById.validationScheme),
    getUserById
  );

  router.put(
    "/",
    requireAuthentication,
    validate(updateUser.validationScheme),
    updateUser
  );

  router.put(
    "/:id",
    requireAuthentication,
    requireAdmin,
    validate(updateUserByID.validationScheme),
    updateUserByID
  );

  router.delete(
    "/",
    requireAuthentication,
    validate(deleteUser.validationScheme),
    deleteUser
  );

  router.delete(
    "/:id",
    requireAuthentication,
    requireAdmin,
    validate(deleteUserByID.validationScheme),
    deleteUserByID
  );

  app.use(router.routes()).use(router.allowedMethods());
};
