export type UserType = {
  id: number;
  name: string;
  email: string;
};

export type EditUserType = {
  name: UserType['name'];
};
