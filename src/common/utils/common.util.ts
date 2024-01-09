import { ONE_SECOND_IN_MILLISECOND } from '../consts';

export const sleep = (seconds: number) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(true), seconds * ONE_SECOND_IN_MILLISECOND),
  );

export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
