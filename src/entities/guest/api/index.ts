import type { AuthorizationPayloadType, RegistrationPayloadType } from '#entities/guest';
import { useFetchWrap } from '#shared/api/useFetchWrap';

const signUp = async (payload: RegistrationPayloadType) => {
  return useFetchWrap({
    url: '/api/auth/signup',
    fetchOptions: {
      method: 'POST',
      body: payload,
    },
  });
};

const signIn = async (payload: AuthorizationPayloadType) => {
  return useFetchWrap({
    url: '/api/auth/signin',
    fetchOptions: {
      method: 'POST',
      body: payload,
    },
  });
};

export const guestApi = {
  signUp,
  signIn,
};
