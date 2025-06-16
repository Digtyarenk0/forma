import { ReactNode, useCallback } from 'react'

import { SupportedLocale } from '@/app/i18n/constants'
import { setUserLocale } from '@/app/i18n/store'
import { useTypedDispatch, useTypedSelector } from '@/app/store'

import { Provider } from './provider'

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useTypedDispatch()
  const storeUserLocale = useTypedSelector((state) => state.i18n.userLocale)

  const onActivate = useCallback(
    (locale: SupportedLocale) => {
      document.documentElement.setAttribute('lang', locale)
      dispatch(setUserLocale(locale))
    },
    [dispatch]
  )

  return (
    <Provider locale={storeUserLocale} onActivate={onActivate}>
      {children}
    </Provider>
  )
}
