import 'dotenv/config';
import { Payload, UserResLogin } from '../types';
import { hashText, signToken, verifyText } from '@/helpers';
import {
  User,
  UserAttributes,
  UserCreationAttributes,
  UserUpdateAttributes,
} from '../db/models/user';
import { verifyToken } from '@/helpers/jsonToken';
import { transport } from '@/config/config';
import { ClientError, ServerError } from '@/errors';

export interface Response {
  success: boolean;
  message: string;
}

const getAllUsers = async (): Promise<UserAttributes[]> => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['updatedAt', 'password'] },
    });
    const usersData = users.map(user => user.get());
    return usersData;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getUserByEmail = async (email: string): Promise<UserAttributes | null> => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    return null;
  }
  const userData = user.get();
  return userData;
};

const createUser = async (userAttributes: UserCreationAttributes): Promise<Response | void> => {
  const newUser = await User.create(userAttributes);
  const userData = newUser.get();
  if (userData) {
    const tokenPayload: Payload = {
      id: userData.id,
      email: userData.email,
    };
    const tokenMasked = signToken(tokenPayload).replace(/\./g, '*'); //se enmascara el token para permitir que el navegador pueda leer la URL
    const message = `<h2>Sigue el siguiente enlace para crear tu contraseña<h2> </br> <a href='${process.env.FRONT_HOST}/auth/recovery/${tokenMasked}'>Crear contraseña</a>`;
    await transport.sendMail({
      from: `${process.env.MAIL_USER}`,
      to: `${userData.email}`,
      subject: 'Enlace para cambio de contraseña',
      html: message,
    });
    return {
      success: true,
      message: 'User created and email sent',
    };
  } else {
    throw new ClientError('User not found', 400);
  }
};

//delete user

const deleteUser = async (id: string): Promise<Response | void> => {
  const userToDelete = await User.findOne({
    where: {
      id: id,
    },
  });
  if (userToDelete) {
    const resp = await User.destroy({ where: { id: id } });
    if (resp) {
      return {
        success: true,
        message: 'User deleted',
      };
    }
  } else {
    throw new ClientError('User not found', 400);
  }
};

const forgotPass = async (email: string): Promise<Response | void> => {
  const userData = await getUserByEmail(email);
  if (userData) {
    const tokenPayload: Payload = {
      id: userData.id,
      email: userData.email,
    };
    const tokenMasked = signToken(tokenPayload).replace(/\./g, '*'); //se enmascara el token para permitir que el navegador pueda leer la URL
    const message = `<h2>Sigue el siguiente enlace para reiniciar tu contraseña<h2> </br> <a href='${process.env.FRONT_HOST}/auth/recovery/${tokenMasked}'>Reestablecer contraseña</a>`;
    await transport.sendMail({
      from: `${process.env.MAIL_USER}`,
      to: `${userData.email}`,
      subject: 'Enlace para cambio de contraseña',
      html: message,
    });
    return {
      success: true,
      message: 'Message sent to user email',
    };
  } else {
    throw new ClientError('User not found', 400);
  }
};

const changePass = async (auth: string, newPassword: string): Promise<Response | void> => {
  try {
    const maskedToken = auth.split(' ')[1];
    const token = maskedToken.replace(/\*/g, '.');
    const decoded: Payload = verifyToken(token);
    if (decoded) {
      const user = await getUserByEmail(decoded.email);
      if (!user) {
        throw new ClientError('User not found', 400);
      }
      await User.update({ password: newPassword }, { where: { id: user.id } });
      return {
        success: true,
        message: 'Password changed',
      };
    }
  } catch (error) {
    throw new ServerError('Server error', 500);
  }
};

const loginBd = async (email: string, password: string): Promise<UserResLogin> => {
  const user = await User.findOne({
    where: { email },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  if (user == null) {
    throw new ClientError('Credenciales inválidas', 401);
  }
  const verifyPassword = await verifyText(password, user.password);
  if (!verifyPassword) {
    throw new ClientError('Credenciales inválidas', 401);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restUser } = user.dataValues;
    const payload = { id: restUser.id, email: restUser.email };
    const token = signToken(payload);
    return { ...restUser, token };
  }
};

const updatePassword = async (
  id: string,
  password: string,
  newPassword: string,
): Promise<Response | void> => {
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new ClientError('Usuario no encontrado', 404);
    }
    const { password: oldHashedPassword } = user;
    const verify = await verifyText(password, oldHashedPassword);
    if (!verify) {
      throw new ClientError('Tu contraseña actual es incorrecta', 400);
    }
    const hashedPassword = await hashText(newPassword);
    await User.update({ password: hashedPassword }, { where: { id } });
    return {
      success: true,
      message: 'Password changed successfully',
    };
  } catch (error) {
    throw new ServerError('Server error', 500);
  }
};

const updateProfileDB = async (id: string, data: UserUpdateAttributes): Promise<Response> => {
  const user = await User.update(data, { where: { id } });
  if (user[0] != 0) {
    return {
      success: true,
      message: 'Profile Updated',
    };
  } else {
    return {
      success: false,
      message: 'Profile Not Updated',
    };
  }
};

export default {
  getAllUsers,
  createUser,
  deleteUser,
  getUserByEmail,
  forgotPass,
  changePass,
  loginBd,
  updatePassword,
  updateProfileDB,
};
