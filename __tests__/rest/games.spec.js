const { withServer} = require('../supertest.setup');


//////////////////////////////////////////////////
// testklasse voor games
//////////////////////////////////////////////////

describe('games', () => {

  let request, knex;

  withServer(({
    supertest,
    knex: k,
  }) =>{
    request = supertest;
    knex = k;
  })

  const url = '/api/games';


  //////////////////////////////////////////////////
  //test getAllGames
  //////////////////////////////////////////////////
  describe('GET /api/games', () => {
    test('should return a list of games', async () => {
      const response = await request.get(url);

      expect(response.status).toBe(200);
    });

})
})