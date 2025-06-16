import { ReactNode, useEffect, useState } from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { en, PluralCategory } from 'make-plural/plurals'

import { DEFAULT_LOCALE, SupportedLocale } from '@/app/i18n/constants'

type LocalePlural = Record<SupportedLocale, (n: number, ordinal?: boolean) => PluralCategory>

const plurals: LocalePlural = {
  'en-US': en
}

export async function dynamicActivate(locale: SupportedLocale, setLoading: (v: boolean) => void) {
  setLoading(true)
  i18n.loadLocaleData(DEFAULT_LOCALE, { plurals: plurals[DEFAULT_LOCALE] })
  try {
    const catalog = await import(`../../locales/${locale}.js`)
    // Bundlers will either export it as default or as a named export named default.
    i18n.load(locale, catalog.messages || catalog.default.messages)
  } catch (_err: unknown) {
    // console.error(error)
  }
  i18n.activate(locale)
}

interface ProviderProps {
  locale: SupportedLocale
  onActivate?: (locale: SupportedLocale) => void
  children: ReactNode
}

export function Provider({ locale, onActivate, children }: ProviderProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dynamicActivate(locale, setLoading)
      .then(() => onActivate?.(locale))
      .catch((error) => {
        console.error('Failed to activate locale', locale, error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [locale, onActivate])

  if (i18n.locale === undefined || i18n.locale === '' || locale === DEFAULT_LOCALE) {
    i18n.loadLocaleData(DEFAULT_LOCALE, { plurals: plurals[DEFAULT_LOCALE] })
    i18n.load(DEFAULT_LOCALE, {})
    i18n.activate(DEFAULT_LOCALE)
  }

  if (loading) return <div className="flex min-h-screen w-full items-center justify-center">loading</div>

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>
}
