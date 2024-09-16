const config = require("config");
const { initializeLogger } = require("../src/core/logging");
const Role = require("../src/core/roles");
const { initializeData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  initializeLogger(config.get("log.level"), config.get("log.disabled"));
  await initializeData();

  const knex = getKnex();

  await knex(tables.user).insert([
    {
      id: 100,
      userName: "Test User",
      name: "testUser",
      last_name: "geslaagd1",
      date_of_birth: "2000-01-25",
      email: "test.user@hogent.be",
      password_hash:
        "$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU",
      roles: JSON.stringify([Role.USER]),
    },
    {
      id: 200,
      userName: "Admin User",
      name: "adminUser1",
      last_name: "geslaagd2",
      date_of_birth: "2000-05-25",
      email: "admin.user@hogent.be",
      password_hash:
        "$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU",
      roles: JSON.stringify([Role.ADMIN, Role.USER]),
    },
    {
      id: 300,
      userName: "Test User Delete",
      name: "testUserDelete",
      last_name: "geslaagd3",
      date_of_birth: "2000-10-25",
      email: "testDelete.user@hogent.be",
      password_hash:
        "$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU",
      roles: JSON.stringify([Role.USER]),
    },
    {
      id: 400,
      userName: "Test User Delete",
      name: "testUserDelete",
      last_name: "geslaagd3",
      date_of_birth: "2000-10-25",
      email: "testDelete.user2@hogent.be",
      password_hash:
        "$argon2id$v=19$m=2048,t=2,p=1$NF6PFLTgSYpDSex0iFeFQQ$Rz5ouoM9q3EH40hrq67BC3Ajsu/ohaHnkKBLunELLzU",
      roles: JSON.stringify([Role.USER]),
    },
  ]);

  await knex(tables.bestellingen).insert([
    {
      id: 100,
      userID: 100,
    },
    {
      id: 200,
      userID: 200,
    },
  ]);

  await knex(tables.transacties).insert([
    {
      id: 100,
      bestellingID: 100,
      transactieDatum: "2023-10-31",
      betaalmethode: "credit card",
      totaalbedrag: 40,
    },
    {
      id: 200,
      bestellingID: 200,
      transactieDatum: "2023-10-31",
      betaalmethode: "bancontact",
      totaalbedrag: 10,
    },
  ]);


  await knex(tables.bestelde_games).insert([
    {
      id: 100,
      bestellingID: 100,
      gameID: 1,
      quantity: 2,
      price: 39.98,
    },
    {
      id: 200,
      bestellingID: 200,
      gameID: 2,
      quantity: 1,
      price: 29.99,
    },
  ]);
};
