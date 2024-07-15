import type { UserType } from '#entities/user';
import type { RoleType } from '#entities/role';

export type BoardType = {
  id: number;
  name: string;
};

export type BoardMemberType = UserType & {
  role: RoleType;
};

export type BoardCreateType = {
  name: string;
};
