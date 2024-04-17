import { User } from '../../../interfaces/user';
import { spost } from '../../../api';
import { AuthLogin } from '../slices';

export const login = async (body: AuthLogin): Promise<User> => {
  const url = 'auth/login';
  return spost({
    url,
    body,
  });
};
