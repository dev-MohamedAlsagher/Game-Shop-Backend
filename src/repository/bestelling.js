const {
  tables,
  getKnex
} = require('../data/index');

const getAll = async () => {
  const bestellingen = await getKnex()(tables.bestellingen)
  .select('bestellingen.id', 'bestellingen.userID', 'bestellingen.createdAt')
  .join(tables.bestelde_games, 'bestellingen.id', '=', 'besteldegames.bestellingID')
  .join(tables.games, 'besteldegames.gameID', '=', 'games.id')
  .join(tables.transacties, 'bestellingen.id', '=', 'transacties.bestellingID')
  .select('games.name as gameName', 'besteldegames.quantity', 'besteldegames.price', 'transacties.totaalbedrag');

const bestellingMap = new Map();

bestellingen.forEach((row) => {
  const bestellingId = row.id;
  if (!bestellingMap.has(bestellingId)) {
    bestellingMap.set(bestellingId, {
      id: row.id,
      userID: row.userID,
      createdAt: row.createdAt,
      games: [],
      totaalbedrag: row.totaalbedrag,
    });
  }

  bestellingMap.get(bestellingId).games.push({
    gameName: row.gameName,
    quantity: row.quantity,
    price: row.price,
  });
});

return [...bestellingMap.values()];
};

const getAllById = async (userId) => {
  const bestellingen = await getKnex()(tables.bestellingen)
    .select('bestellingen.id', 'bestellingen.userID', 'bestellingen.createdAt')
    .join(tables.bestelde_games, 'bestellingen.id', '=', 'besteldegames.bestellingID')
    .join(tables.games, 'besteldegames.gameID', '=', 'games.id')
    .join(tables.transacties, 'bestellingen.id', '=', 'transacties.bestellingID')
    .select('games.name as gameName', 'besteldegames.quantity', 'besteldegames.price', 'transacties.totaalbedrag')
    .where('bestellingen.userID', userId);

  const bestellingMap = new Map();

  bestellingen.forEach((row) => {
    const bestellingId = row.id;
    if (!bestellingMap.has(bestellingId)) {
      bestellingMap.set(bestellingId, {
        id: row.id,
        userID: row.userID,
        createdAt: row.createdAt,
        games: [],
        totaalbedrag: row.totaalbedrag,
      });
    }

    bestellingMap.get(bestellingId).games.push({
      gameName: row.gameName,
      quantity: row.quantity,
      price: row.price,
    });
  });
  return [...bestellingMap.values()];
};


const createBestelling = async (userID) => {
  const bestelling = {
    userID,
    createdAt: new Date(),
  };

  const [bestellingID] = await getKnex()(tables.bestellingen).insert(bestelling);
  return bestellingID;
};





module.exports = {
  getAll,
  getAllById,
  createBestelling,
};