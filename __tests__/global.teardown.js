const { shutdownData, getKnex, tables } = require('../src/data');

module.exports = async () => {

  await getKnex()(tables.bestelde_games).where('id', '>=', 100).delete(); 
  await getKnex()(tables.transacties).where('id', '>=', 100).delete();
  await getKnex()(tables.bestellingen).where('id', '>=', 100).delete();
  await getKnex()(tables.user).where('id', '>=', 100).delete();


  await shutdownData();
};
