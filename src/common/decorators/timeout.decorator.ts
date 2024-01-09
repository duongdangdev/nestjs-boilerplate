import { SetMetadata } from '@nestjs/common';
import { ONE_SECOND_IN_MILLISECOND } from '../consts';

export const TIMEOUT_KEY = 'app_timeout';

export const Timeout = (seconds: number) =>
  SetMetadata(TIMEOUT_KEY, seconds * ONE_SECOND_IN_MILLISECOND);
