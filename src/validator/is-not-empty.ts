import { IsNotEmpty, ValidationOptions } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export function _IsNotEmpty(validationOptions?: ValidationOptions) {
  return IsNotEmpty({
    message: i18nValidationMessage('validation.NotEmpty'),
    ...validationOptions,
  });
}
