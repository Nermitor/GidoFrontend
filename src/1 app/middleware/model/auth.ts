import { userApi } from '#entities/user';
import { ROUTE_NAMES } from '#shared/constants';

export default defineNuxtRouteMiddleware(async () => {
  const { data } = await userApi.get();

  if (!data.value) {
    return navigateTo(ROUTE_NAMES.SIGNIN);
  }
});
