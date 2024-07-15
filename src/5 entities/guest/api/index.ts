import type { AuthorizationPayloadType, RegistrationPayloadType } from '#entities/guest';
import { useFetchWrap } from '#shared/api';

const signUp = async (body: RegistrationPayloadType) => {
  return useFetchWrap({
    url: '/api/auth/signup',
    fetchOptions: {
      method: 'post',
      body,
    },
  });
};

const signIn = async (body: AuthorizationPayloadType) => {
  return useFetchWrap({
    url: '/api/auth/signin',
    fetchOptions: {
      method: 'post',
      body,
    },
  });
};

export const guestApi = {
  signUp,
  signIn,
};
