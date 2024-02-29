export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface IUserContext {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
}
