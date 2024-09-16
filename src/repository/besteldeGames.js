const {
  tables,
  getKnex
} = require('../data/index');

const createBesteldeGames = async (bestellingID, games) => {
  const gameRecords = games.map(game => ({
    bestellingID,
    gameID: game.gameID,
    quantity: game.quantity,
    price: game.price,
  }));

  await getKnex()(tables.bestelde_games).insert(gameRecords);
};


module.exports = {
  createBesteldeGames,
}