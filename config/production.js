require('dotenv').config();

module.exports = {
  log: {
    level: 'info',
    disabled: false,
  },
  cors: {
    origins: ['https://gamestart.onrender.com'],
    maxAge: 3 * 60 * 60,
  },

  database: {
    client: 'mysql2',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },

  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expirationInterval: 60 * 60 * 10000,
      issuer: 'https://gamestart-api.onrender.com',
      audience: 'https://gamestart.onrender.com',
    },
  },
  port: 9000,
};
