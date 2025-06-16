const linguiConfig = {
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}',
      include: ['<rootDir>/src']
    }
  ],
  compileNamespace: 'cjs',
  fallbackLocales: {
    default: 'en-US'
  },
  format: 'po',
  formatOptions: {
    lineNumbers: false
  },
  locales: [
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
  ],
  orderBy: 'messageId',
  rootDir: '.',
  runtimeConfigModule: ['@lingui/core', 'i18n'],
  sourceLocale: 'en-US'
}

export default linguiConfig
