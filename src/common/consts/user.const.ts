export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface IUserContext {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
}
