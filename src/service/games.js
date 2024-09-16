const gamesRepository = require('../repository/games');
const { getLogger } = require('../core/logging');


const getAllGames = async () => {
  try {
    const games = await gamesRepository.getAllGames();
    return games;
  } catch (error) {
    getLogger().error(`Error while fetching games`);
    throw new Error('Error while fetching games');
  }
};

module.exports = {
  getAllGames,
};
