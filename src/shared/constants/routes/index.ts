export const ROUTE_NAMES = {
  INDEX: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
} as const;

// Тип значения, которое содержится по одному из ключей объекта ROUTE_NAMES.
export type RouteNamesValueType = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES];

// Тип, содержащий все ключи объекта ROUTE_NAMES.
export type RouteNamesKeysType = keyof typeof ROUTE_NAMES;

// Тип, содержащий все ключи объекта ROUTE_NAMES. Доступен только для чтения.
export type RouteNamesAllValuesType = ReadonlyArray<RouteNamesValueType>;
