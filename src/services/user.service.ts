// aqui nos comunicamos con la db => sequelize models
import 'dotenv/config';
import { User, UserAttributes, UserCreationAttributes } from '../db/models/user';
import { signToken } from '@/helpers';
import { Payload, verifyToken } from '@/helpers/jsonToken';
import { transport } from '@/config/config';
import { ClientError, ServerError } from '@/errors';

interface Response {
  success: boolean;
  message: string;
}

const getAllUsers = async (): Promise<UserAttributes[]> => {
  try {
    const users = await User.findAll();
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
  try {
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
        from: `${process.env.G_MAIL}`,
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
  } catch (error) {
    throw new ServerError('Server error', 500);
  }
};

const forgotPass = async (email: string): Promise<Response | void> => {
  try {
    const userData = await getUserByEmail(email);
    if (userData) {
      const tokenPayload: Payload = {
        id: userData.id,
        email: userData.email,
      };
      const tokenMasked = signToken(tokenPayload).replace(/\./g, '*'); //se enmascara el token para permitir que el navegador pueda leer la URL
      const message = `<h2>Sigue el siguiente enlace para reiniciar tu contraseña<h2> </br> <a href='${process.env.FRONT_HOST}/auth/recovery/${tokenMasked}'>Reestablecer contraseña</a>`;
      await transport.sendMail({
        from: `${process.env.G_MAIL}`,
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
  } catch (error) {
    throw new ServerError('Server error', 500);
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

export default {
  getAllUsers,
  createUser,
  getUserByEmail,
  forgotPass,
  changePass,
};
