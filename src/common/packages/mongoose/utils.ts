import { MONGODB_DUPLICATE_ERROR_CODE } from './constants';

export const isMongoDuplicateError = (error) =>
  error.code === MONGODB_DUPLICATE_ERROR_CODE;
