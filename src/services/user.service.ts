import { User } from '@/db/models/user';
import { ClientError } from '@/errors';
import { signToken, verifyText } from '@/helpers';
import { UserResLogin } from '../types';

const getAllUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  return users;
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

export default {
  getAllUsers,
  loginBd,
};
