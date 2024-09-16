const {
  tables,
  getKnex
} = require('../data/index');

const getAllGames = async () => {
  const games = getKnex()(tables.games).select('id', 'name', 'beschrijving', 'prijs', 'console', 'image_url');

  return games;
}


module.exports = {
  getAllGames,
}