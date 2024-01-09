import { IsString, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function _IsString(validationOptions?: ValidationOptions) {
  return IsString({
    message: i18nValidationMessage('validation.IsString'),
    ...validationOptions,
  });
}
