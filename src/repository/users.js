const {
  tables,
  getKnex
} = require('../data/index');
const { getLogger } = require('../core/logging');





const SELECT_COLUMNS = [
  'id',
  'username',
  'email',
  'name',
  'last_name',
  'date_of_birth',
];

const getAll = async () => {
  const users = await getKnex()(tables.user).select(SELECT_COLUMNS);
  return users;
}

const findById = async (id) => {
  const user = await getKnex()(tables.user)
    .select(SELECT_COLUMNS)
    .where('id', id)
    .first();

  return user;
};

const findByEmail = (email) => {
  return getKnex()(tables.user).where('email', email).first();
};


const create = async ({
  username,
  name,
  lastName,
  dateOfBirth,
  email,
  password,
  roles,
}) => {
  const createdAt = new Date();
  try{ 
    const [id] = await getKnex()(tables.user).insert({
    username,
    name,
    last_name: lastName,
    date_of_birth: dateOfBirth,
    email,
    password_hash: password,
    roles: JSON.stringify(roles),
    createdAt,
  });
    return id;
  }catch(error){
    getLogger().error('Error in create', { error });
    throw error;
  }
};

const updateUser = async (userId, updateData) => {
  const updatedFields = {};


  if (updateData.username) {
    updatedFields.username = updateData.username;
  }
  if (updateData.password) {
    updatedFields.password_hash = updateData.password;
  }
  if (updateData.email) {
    updatedFields.email = updateData.email;
  }
  if (updateData.name) {
    updatedFields.name = updateData.name;
  }
  if (updateData.lastName) {
    updatedFields.last_name = updateData.lastName;
  }

  await getKnex()(tables.user).where('id', userId).update(updatedFields);

  const updatedUser = await getKnex()(tables.user).where('id', userId).first();

  return updatedUser;
};




const deleteUser = async (id) => {
  return getKnex().transaction(async (trx) => {

    await trx(tables.bestelde_games)
      .whereIn('bestellingID', function() {
        this.select('id').from(tables.bestellingen).where('userID', id);
      })
      .delete();


    await trx(tables.transacties)
      .whereIn('bestellingID', function() {
        this.select('id').from(tables.bestellingen).where('userID', id);
      })
      .delete();


    await trx(tables.bestellingen).where('userID', id).delete();


    const userDeleted = await trx(tables.user).where('id', id).delete();

    return userDeleted;
  });
};



module.exports = {
  findById,
  create,
  getAll,
  updateUser,
  deleteUser,
  findByEmail,
};