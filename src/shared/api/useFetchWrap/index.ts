import type { AvailableRouterMethod, NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { type AsyncDataOptions, useAsyncData } from '#app/composables/asyncData';
import { navigateTo, useRuntimeConfig } from '#app';
import { ROUTE_NAMES } from '#shared/constants';

type FetchWrapOptionsType<T> = {
  url: string;
  fetchOptions?: NitroFetchOptions<NitroFetchRequest & AvailableRouterMethod<string>>;
  dataOptions?: AsyncDataOptions<T>;
};

export const useFetchWrap = async <T extends Record<string, any> = Record<string, any>>({
  url,
  dataOptions = {},
  fetchOptions = {},
}: FetchWrapOptionsType<T>) => {
  const uniqueKey = url;

  const baseUrl = useRuntimeConfig().public.env.NUXT_API_BASE_URL;

  return useAsyncData<T, T, T>(
    uniqueKey,
    () =>
      $fetch<T>(uniqueKey, {
        responseType: 'json',
        baseURL: baseUrl,
        async onResponseError({ response }) {
          if (response.status === 401) {
            navigateTo(ROUTE_NAMES.SIGNIN);
          }
        },
        credentials: 'include',
        ...fetchOptions,
      }),
    {
      ...(dataOptions ? dataOptions : {}),
    }
  );
};
