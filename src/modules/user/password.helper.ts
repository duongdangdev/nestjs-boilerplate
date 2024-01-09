import { APP_CONFIG } from '@src/configs';
import { compare, hash } from 'bcrypt';

export const hashPassword = (rawPassword: string) => {
  return hash(rawPassword, APP_CONFIG.passwordSaltRounds);
};

export const comparePassword = (rawPassword: string, hashedPassword: string) =>
  compare(rawPassword, hashedPassword);
