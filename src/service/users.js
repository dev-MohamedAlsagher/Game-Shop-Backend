const ServiceError = require('../core/serviceError');
const handleDBError = require('./_handleDBError');
const userRepository = require('../repository/users')
const { verifyPassword, hashPassword} = require('../core/password');
const Role = require('../core/roles');
const { getLogger } = require('../core/logging');
const { generateJWT, verifyJWT } = require('../core/jwt');


const checkAndParseSession = async (authHeader) => {

  if (!authHeader) {
    throw ServiceError.unauthorized('You need to be signed in');
  } 


  if (!authHeader.startsWith('Bearer ')) {
    throw ServiceError.unauthorized('Invalid authentication token');
  }

  const authToken = authHeader.substring(7); 
  try {
    const { roles, userId } = await verifyJWT(authToken); 

    return {
      userId,
      roles,
      authToken,
    }; 
  } catch (error) {
    getLogger().error(error.message, { error });
    throw new Error(error.message);
  } 
};

const checkRole = (role, roles) => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.forbidden(
      'You are not allowed to view this part of the application'
    );
  }
};

const makeExposedUser = ({ id, username,name, lastName, birthOfDate, email, roles }) => ({
  id,
  username,
  name,
  lastName,
  birthOfDate,
  email,
  roles,
});


const makeLoginData = async (user) => {
  const token = await generateJWT(user); 
  return {
    user: makeExposedUser(user),
    token,
  }; 
};


const login = async (email, password) => {
  try {
  const user = await userRepository.findByEmail(email); 

  if (!user) {
    getLogger().error('The given email and password do not match');
    throw ServiceError.unauthorized(
      'The given email and password do not match'
    );
  }
  const passwordValid = await verifyPassword(password, user.password_hash);

  if (!passwordValid) {
    getLogger().error('The given email and password do not match');
    throw ServiceError.unauthorized(
      'The given email and password do not match'
    );
  }
  return await makeLoginData(user); 
} catch (error) {
  if (error instanceof ServiceError) {
    if (error.statusCode === 401) {
      throw {
        status: 401,
        message: 'Invalid email or password',
      };
    }
  }
  getLogger().error('Internal Server Error', { error });
  throw {
    status: 500,
    message: 'Internal Server Error',
  };
  }
};


const register = async ({
  username,
  name,
  lastName,
  dateOfBirth,
  email, 
  password,
}) => {
  try {
    if (await userRepository.findByEmail(email)) {
      getLogger().error('The given email already exists');
      const error = ServiceError.EmailExists('The given email already exists');
      error.status = 400;
      throw error;
    }

    const passwordHash = await hashPassword(password);
    const userID = await userRepository.create({
      username,
      name,
      lastName,
      dateOfBirth,
      email,
      password: passwordHash,
      roles: [Role.USER],
    });

    const publicUserData = await userRepository.findById(userID);
    return await makeLoginData(publicUserData)
  } catch (error) {
    getLogger().error('Internal Server Error');
    error.status = error.status || 500;
  throw handleDBError(error);
}
};


const getAllUsers = async () => {
  try {
    const users = await userRepository.getAll();
    return users;
  } catch (error) {
    getLogger().error('Error retrieving all users');
    throw handleDBError(error);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await userRepository.findById(userId);
    return user;
  } catch (error) {
    getLogger().error(`Error retrieving user`);
    throw handleDBError(error);
  }
};

const updateUser = async (userId, updates) => {
  const userUpdates = {};

  const user = await userRepository.findById(userId);

  if (!user) {
    getLogger().error(`User not found`);
    throw ServiceError.notFound('User not found');
  }

  if (updates.username) {
    userUpdates.username = updates.username;
  }

  if (updates.email) {
    userUpdates.email = updates.email;
  }

  if (updates.password) {
    const hashedPassword = await hashPassword(updates.password);
    userUpdates.password = hashedPassword;
  }

  if (updates.name) {
    userUpdates.name = updates.name;
  }

  if (updates.lastName) {
    userUpdates.lastName = updates.lastName;
  }

  try {
    if (
      userUpdates.email !== undefined &&
      !(await userRepository.findByEmail(userUpdates.email))
    ) {
      const updatedUser = await userRepository.updateUser(userId, updates);
      if (!updatedUser) {
        getLogger().error(`User not found`);
        throw ServiceError.notFound('User not found');
      }
      return updatedUser;
    } else if (userUpdates.email === undefined) {
      const updatedUser = await userRepository.updateUser(userId, userUpdates);
      if (!updatedUser) {
        getLogger().error(`User not found`);
        throw ServiceError.notFound('User not found');
      }
      return updatedUser;
    }
  } catch (error) {
    throw handleDBError(error);
  }
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await userRepository.deleteUser(userId);
    if (!deletedUser) {
      getLogger().error(`User not found`);
      throw ServiceError.notFound('User not found');
    }
    return { message: 'User deleted' };
  } catch (error) {
    getLogger().error(`Error deleting user`);
    throw handleDBError(error);
  }
};

module.exports = {
  checkAndParseSession,
  register,
  login,
  checkRole,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers
}