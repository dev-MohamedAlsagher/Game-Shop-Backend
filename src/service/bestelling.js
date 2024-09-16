const bestellingService = require('../repository/bestelling');
const besteldeGamesService = require('../repository/besteldeGames');
const transactieService = require('../repository/transacties');
const { getLogger } = require('../core/logging');

const createBestelling = async (userID,  games, betaalmethode, totaalbedrag ) => {
  try {
    const bestellingID = await bestellingService.createBestelling(userID);

    await besteldeGamesService.createBesteldeGames(bestellingID, games);

    await transactieService.createTransactie(bestellingID, betaalmethode, totaalbedrag);

    return { id: bestellingID };
  } catch (error) {
    getLogger().error(`Error trying to create bestelling`);
    throw new Error('Error trying to create bestelling');
  }
};

const getAllById = async (userID) => {
  try {
    const bestellingen = bestellingService.getAllById(userID);
    return bestellingen;
  } catch (error) {
    getLogger().error(`Error trying to get bestellingen`);
    throw new Error('Error trying to get bestellingen');
  }
};

module.exports = {
  createBestelling,
  getAllById
};