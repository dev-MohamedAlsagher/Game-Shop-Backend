const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).delete(); 

    await knex(tables.user).insert([{
        id: 1,
        username: 'user1',
        name: 'user1',
        last_name: 'lastnameuser1',
        date_of_birth: '2000-01-01',
        email: 'user1@hotmail.com',
        password_hash:'$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.ADMIN, Role.USER]),
      },
      {
        id: 2,
        username: 'user2',
        name: 'user2',
        last_name: 'lastnameuser2',
        date_of_birth: '2000-01-02',
        email: 'user2@hotmail.com',
        password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      roles: JSON.stringify([Role.USER]),
      },
      {
        id: 3,
        username: 'user3',
        name: 'user3',
        last_name: 'lastnameuser3',
        date_of_birth: '2000-01-03',
        email: 'user3@hotmail.com',
        password_hash:
          '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.USER]),
      },
    ]);
  },
}