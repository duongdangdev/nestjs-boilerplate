import {
  I18nOptions,
  I18nTranslator,
  Path,
  PathValue,
  TranslateOptions,
} from 'nestjs-i18n';
import { I18nTranslations } from './i18n-auto-generated-type';
import { ValidationArguments } from 'class-validator';

declare module 'nestjs-i18n' {
  export declare function i18nValidationMessage(
    key: Path<I18nTranslations>,
    args?: any,
  ): (a: ValidationArguments) => string;

  export declare class I18nService
    implements I18nTranslator<I18nTranslations>, OnModuleDestroy
  {
    protected readonly i18nOptions: I18nOptions;
    private readonly logger;
    private readonly loader;
    private readonly languagesSubject;
    private readonly translationsSubject;
    private supportedLanguages;
    private translations;
    private pluralRules;
    private unsubscribe;
    constructor(
      i18nOptions: I18nOptions,
      translations: Observable<I18nTranslation>,
      supportedLanguages: Observable<string[]>,
      logger: Logger,
      loader: I18nLoader,
      languagesSubject: BehaviorSubject<string[]>,
      translationsSubject: BehaviorSubject<I18nTranslation>,
    );
    onModuleDestroy(): void;
    t<
      P extends Path<I18nTranslations> = any,
      R = PathValue<I18nTranslations, P>,
    >(key: P, options?: TranslateOptions): IfAnyOrNever<R, string, R>;
  }
}
