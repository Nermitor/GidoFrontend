import type { AvailableRouterMethod, NitroFetchOptions, NitroFetchRequest } from 'nitropack';
import { type AsyncDataOptions } from '#app/composables/asyncData';
import { ROUTE_NAMES } from '#shared/constants';

export type ApiResponseType<T> = {
  payload: T;
  message?: string[];
};

export type FetchWrapOptionsType<T> = {
  url: string;
  fetchOptions?: NitroFetchOptions<NitroFetchRequest & AvailableRouterMethod<string>>;
  dataOptions?: AsyncDataOptions<ApiResponseType<T>>;
};

export const useFetchWrap = async <T extends Record<string, any> = Record<string, any>>({
  url,
  dataOptions = {},
  fetchOptions = {},
}: FetchWrapOptionsType<T>) => {
  const uniqueKey = url;

  const baseUrl = 'http://localhost:3000';

  const nuxtApp = useNuxtApp();

  return useAsyncData<ApiResponseType<T>, ApiResponseType<T>, ApiResponseType<T>>(
    uniqueKey,
    async () =>
      $fetch<ApiResponseType<T>>(uniqueKey, {
        responseType: 'json',
        baseURL: baseUrl,
        method: 'get',
        credentials: 'include',
        headers: process.server ? useRequestHeaders(['cookie']) : undefined,
        onResponseError: async ({ response }) => {
          if (response.status === 401) {
            nuxtApp.runWithContext(() => navigateTo(ROUTE_NAMES.SIGNIN));
          }
        },
        onResponse: async ({ response }) => {
          console.log(response._data);
        },
        ...fetchOptions,
      }),
    {
      ...(dataOptions ? dataOptions : {}),
    }
  );
};
