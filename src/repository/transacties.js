const {
  tables,
  getKnex
} = require('../data/index');

const createTransactie = async (bestellingID, betaalmethode, totaalbedrag) => {
  const transactie = {
    bestellingID,
    transactieDatum: new Date(),
    betaalmethode,
    totaalbedrag,
  };

  const [transactieID] = await getKnex()(tables.transacties).insert(transactie);
  return transactieID;
};


module.exports = {
  createTransactie,
};
