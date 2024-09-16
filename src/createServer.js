const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const installRoutesRouter = require("./rest/index");
const installMiddlewares = require("./core/installMiddlewares");
const { initializeData, shutdownData } = require("./data");
const config = require("config");
const { initializeLogger, getLogger } = require("./core/logging");


const NODE_ENV = config.get("env");
const LOG_LEVEL = config.get("log.level");
const LOG_DISABLED = config.get("log.disabled");

module.exports = async function createServer() {
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: {
      NODE_ENV,
    },
  });

  await initializeData();

  const app = new Koa();

  app.use(bodyParser());
  installMiddlewares(app);
  installRoutesRouter(app);



  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        const port = config.get('port');
        app.listen(port);
        getLogger().info(`🚀 Server listening on http://localhost:${port}`);
        resolve();
      });
    },

    async stop() {
      app.removeAllListeners();
      await shutdownData();
      getLogger().info("Goodbye! 👋");
    },
  };
};
