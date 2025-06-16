export const SUPPORTED_LOCALES = [
  'en-US',
  'zh-CN',
  'zh-TW',
  'fr-FR',
  'pt-BR',
  'tr-TR',
  'uk-UA',
  'vi-VN',
  'es-ES',
  'ar-SA',
  'fi-IR',
  'hi-IN',
  'ja-JP',
  'ko-KR'
]
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = 'en-US'
