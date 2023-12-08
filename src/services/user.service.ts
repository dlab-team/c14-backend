// aqui nos comunicamos con la db => sequelize models
import 'dotenv/config';
import { User, UserAttributes, UserCreationAttributes } from '../db/models/user';
import { signToken } from '@/helpers';
import { Payload } from '@/helpers/jsonToken';
import { transport } from '@/config/config';

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

const createUser = async (userAttributes: UserCreationAttributes): Promise<Response> => {
  try {
    const newUser = await User.create(userAttributes);
    const userData = newUser.get();
    if (userData) {
      const tokenPayload: Payload = {
        id: userData.id,
        email: userData.email,
      };
      const tokenMasked = signToken(tokenPayload).replace(/\./g, '*'); //se enmascara el token para permitir que el navegador pueda leer la URL
      const message = `<h2>Sigue el siguiente enlace para crear tu contraseña<h2> </br> <a href='${process.env.FRONT_HOST}/auth/recovery/${tokenMasked}'>Reestablecer contraseña</a>`;
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
      return {
        success: false,
        message: 'Error while creating the user',
      };
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const forgotPass = async (email: string) => {
  
}

export default {
  getAllUsers,
  createUser,
};
