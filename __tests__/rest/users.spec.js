const { tables } = require("../../src/data");
const { withServer, login, loginAdmin, deleteLogin } = require("../supertest.setup");
const { testAuthHeader } = require("../common/auth");

//////////////////////////////////////////////////
// testklasse voor users
//////////////////////////////////////////////////

describe("users", () => {
  let request, knex, authHeaderUser, authHeaderAdmin, authDeleteUser;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    authHeaderUser = await login(request);
    authDeleteUser = await deleteLogin(request);
    authHeaderAdmin = await loginAdmin(request);
  });

  const url = "/api/users";

  //////////////////////////////////////////////////
  //test getAll user
  //////////////////////////////////////////////////
  describe("GET /api/users", () => {
    test("it should return all users with proper authentication", async () => {
      const response = await request
        .get(url)
        .set("Authorization", authHeaderUser);

      expect(response.status).toBe(200);

      //user kan alleen zijn eigen gegevens ontangen. alleen admin kan alle users te zien krijgen.
    });
  });

  //////////////////////////////////////////////////
  //test getAll admin
  //////////////////////////////////////////////////
  describe("GET /api/users", () => {
    test("it should return all users with proper authentication", async () => {
      const response = await request
        .get(url)
        .set("Authorization", authHeaderAdmin);

      expect(response.status).toBe(200);
    });

    testAuthHeader(() => request.get(url));
  });

  //////////////////////////////////////////////////
  //test getUserByID user
  //////////////////////////////////////////////////
  describe("GET /api/users/:id", () => {
    test("should return a user with proper authentication", async () => {
      const response = await request
        .get(url + "/10")
        .set("Authorization", authHeaderUser);

      expect(response.status).toBe(403);
    });
  });

  //////////////////////////////////////////////////
  //test getUserByID admin
  //////////////////////////////////////////////////
  describe("GET /api/users/:id", () => {
    test("should return a user with proper authentication", async () => {
      const response = await request
        .get(url + "/100")
        .set("Authorization", authHeaderAdmin);

      expect(response.status).toBe(200);
    });
  });

  //////////////////////////////////////////////////
  //test registreer User
  //////////////////////////////////////////////////

  describe("POST /api/users/register", () => {
    let userToDelete;

    afterAll(async () => {
      if (userToDelete) {
        await knex(tables.user).whereIn("id", [userToDelete]).delete();
      }
    });

    test("should create a user and return it with proper authentication", async () => {
      const response = await request.post(url + "/register").send({
        username: "test",
        name: "tester",
        lastName: "geslaagd",
        dateOfBirth: "2000-01-17",
        email: "test1@hotmail.com",
        password: "test123",
      });

      expect(response.status).toBe(201);
      expect(response.body.user.id).toBeTruthy();
      expect(response.body.user.username).toBe("test");
      expect(response.body.user.email).toBe("test1@hotmail.com");
      userToDelete = response.body.user.id;
    });
  });

  //////////////////////////////////////////////////
  //test registreer User met bestaande email
  //////////////////////////////////////////////////

  describe("POST /api/users/register", () => {
    test("should return an error when registering with an existing email", async () => {
      const response1 = await request.post(url + "/register").send({
        username: "testEmail",
        name: "test",
        lastName: "email",
        dateOfBirth: "2000-01-17",
        email: "testemail@hotmail.com",
        password: "test123",
      });

      const response2 = await request.post(url + "/register").send({
        username: "testDuplicateEmail",
        name: "duplicate",
        lastName: "email",
        dateOfBirth: "2000-01-17",
        email: "testemail@hotmail.com",
        password: "test456",
      });

      expect(response2.status).toBe(400);
      expect(response2.body.message).toBe("The given email already exists");
    });
  });

  //////////////////////////////////////////////////
  //test put User (role user) fails
  //////////////////////////////////////////////////
  describe("PUT /api/users/:id", () => {
    let userToUpdate;

    beforeAll(async () => {
      const response = await request.post(url + "/register").send({
        username: "test3",
        name: "tester3",
        lastName: "geslaagd3",
        dateOfBirth: "2000-01-19",
        email: "test3@hotmail.com",
        password: "test34567",
      });
      console.log(response.body);
      userToUpdate = response.body.user.id;
    });

    afterAll(async () => {
      await knex(tables.user).whereIn("id", [userToUpdate]).delete();
    });

    test("should not update a user and return status 403", async () => {
      const response = await request
        .put(url + `/${userToUpdate}`)
        .set("Authorization", authHeaderUser)
        .send({
          username: "newUsername",
          name: "fakeName",
          email: "newemail1@example.com",
          password: "newPassword",
        });

      expect(response.status).toBe(403);
    });
  });

  //////////////////////////////////////////////////
  //test put User (role user) works
  //////////////////////////////////////////////////
  describe("PUT /api/users", () => {
    let initialUserData;

    beforeAll(async () => {
      const initialUserResponse = await request
        .get(url)
        .set("Authorization", authHeaderUser);
      initialUserData = initialUserResponse.body;
    });
    afterAll(async () => {
      await request.put(url).set("Authorization", authHeaderUser).send({
        username: initialUserData.username,
        lastName: initialUserData.lastName,
        email: initialUserData.email,
        password: initialUserData.password,
      });
    });

    test("should update a user and return the updated user with proper authentication", async () => {
      const response = await request
        .put(url)
        .set("Authorization", authHeaderUser)
        .send({
          username: "newUsername",
          lastName: "nameWorked",
          email: "newemail2@example.com",
          password: "wachtwoord158",
        });

      expect(response.status).toBe(200);
    });
  });

  //////////////////////////////////////////////////
  //test put User (role user) email fails
  //////////////////////////////////////////////////
  describe("PUT /api/users", () => {
    test("should return a 400 status when updating with an invalid email", async () => {
      const response = await request
        .put(url)
        .set("Authorization", authHeaderUser)
        .send({
          email: "testhotmail/com",
        });

      expect(response.status).toBe(400);
    });
  });

  //////////////////////////////////////////////////
  //test put User (role admin)
  //////////////////////////////////////////////////
  describe("PUT /api/users/:id", () => {
    let userToUpdate;

    beforeAll(async () => {
      const response = await request.post(url + "/register").send({
        username: "test3",
        name: "tester3",
        lastName: "geslaagd3",
        dateOfBirth: "2000-01-25",
        email: "test2@hotmail.com",
        password: "test3789784",
      });

      userToUpdate = response.body.user.id;
    });

    afterAll(async () => {
      await knex(tables.user).whereIn("id", [userToUpdate]).delete();
    });

    test("should update a user and return the updated user with proper authentication", async () => {
      const response = await request
        .put(url + `/${userToUpdate}`)
        .set("Authorization", authHeaderAdmin)
        .send({
          username: "newUsername",
          email: "newemail3@example.com",
          password: "newPassword",
        });

      expect(response.status).toBe(200);
    });
  });

  //////////////////////////////////////////////////
  //test delete User (role user)
  //////////////////////////////////////////////////
  describe("DELETE /api/users", () => {

    test("should delete a user with proper authentication", async () => {
      const response = await request.delete(url).set("Authorization", authDeleteUser);

      console.log(response.status);
      expect(response.status).toBe(200);
      userToDelete = response.body.id;
    });
  });

  //////////////////////////////////////////////////
  //test delete User (role user) fails
  //////////////////////////////////////////////////
  describe("DELETE /api/users/:id", () => {
    let userToDelete;
    let token;

    beforeAll(async () => {
      const response = await request.post(url + "/register").send({
        username: "test2",
        name: "tester2",
        lastName: "geslaagd2",
        dateOfBirth: "2000-02-25",
        email: "test5@hotmail.com",
        password: "test123456",
      });
      console.log("User creation response:", response.body);
      userToDelete = response.body.user.id;
      token = `Bearer ${response.body.token}`;
    });

    afterAll(async () => {
      if (userToDelete) {
        await knex(tables.user).whereIn("id", [userToDelete]).delete();
      }
    });

    test("should not delete a user with failed authentication", async () => {
      const response = await request
        .delete(url + `/1}`)
        .set("Authorization", token);

      expect(response.status).toBe(403);
    });
  });

  //////////////////////////////////////////////////
  //test delete User (role admin)
  //////////////////////////////////////////////////
  describe("DELETE /api/users/:id", () => {
    // user om te deleten aangemaakt in global setup.

    test("should delete a user with proper authentication", async () => {
      const response = await request
        .delete(url + "/300")
        .set("Authorization", authHeaderAdmin);

      expect(response.status).toBe(200);
    });
  });
});
