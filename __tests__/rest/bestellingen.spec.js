const { withServer, login, loginAdmin } = require('../supertest.setup');
const { testAuthHeader } = require('../common/auth');

//////////////////////////////////////////////////
// Test class for Bestellingen
//////////////////////////////////////////////////

describe('bestellingen', () => {
  let request, knex, authHeaderUser, authHeaderAdmin;

  withServer(({
    supertest,
    knex: k,
  }) =>{
    request = supertest;
    knex = k;
  })
 
  beforeAll(async () => {
   
   authHeaderUser = await login(request);
   authHeaderAdmin = await loginAdmin(request);
  });
  

  const url = '/api/bestelling';

  //////////////////////////////////////////////////
  // Test getAll user
  //////////////////////////////////////////////////
  describe('GET /api/bestelling', () => {
    test('it should return all bestellingen with proper authentication', async () => {
      const response = await request.get(url).set('Authorization', authHeaderUser);

      expect(response.status).toBe(200);
    });
    testAuthHeader(() => request.get(url))
  });


  //////////////////////////////////////////////////
  // Test getAllById user
  //////////////////////////////////////////////////
  describe('GET /api/bestelling', () => {
    test('it should return all bestellingen with proper authentication', async () => {
      const response = await request.get(`${url}/1`).set('Authorization', authHeaderUser);

      expect(response.status).toBe(403);
    });
  });


    //////////////////////////////////////////////////
  // Test getAllById admin
  //////////////////////////////////////////////////
  describe('GET /api/bestelling', () => {
    test('it should return all bestellingen with proper authentication', async () => {
      const response = await request.get(`${url}/1`).set('Authorization', authHeaderAdmin);

      expect(response.status).toBe(200);
    });
  });


  //////////////////////////////////////////////////
  // Test post bestelling
  //////////////////////////////////////////////////

  describe('POST /api/bestelling', () => {
    test('should create a bestelling and return it with proper authentication', async () => {
      const response = await request.post(url)
        .set('Authorization', authHeaderUser)
        .send({
          games: [
            {
              gameID: 1,
              quantity: 1,
              price: 10
            },
            {
              gameID: 2,
              quantity: 1,
              price: 30
            },
          ],
          betaalmethode: "Credit Card",
          totaalbedrag: 40
        });
  
      expect(response.status).toBe(201);
    });
  });
});
