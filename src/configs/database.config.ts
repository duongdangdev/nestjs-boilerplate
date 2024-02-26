import { plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString, validate } from 'class-validator';

class Config {
  @IsString()
  @IsNotEmpty()
  uri: string;
}

export const DATABASE_CONFIG = Object.freeze(
  plainToClass(Config, { uri: process.env.DATABASE_URI }),
);

validate(DATABASE_CONFIG).then((errors) => {
  if (errors?.length) {
    console.error(errors);
    throw errors;
  }
});
