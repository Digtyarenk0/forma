import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DEFAULT_LOCALE, SupportedLocale } from './constants'
import { navigatorLocale } from './helper'

export const USER_LOCALE = 'user_locale_i18n'

const localeInLocalStorage = localStorage?.getItem(USER_LOCALE)
const initialLocale = localeInLocalStorage ?? navigatorLocale() ?? DEFAULT_LOCALE

interface I18nState {
  userLocale: SupportedLocale
}

const initialState: I18nState = {
  userLocale: initialLocale
}

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setUserLocale: (state, action: PayloadAction<SupportedLocale>) => {
      state.userLocale = action.payload
      localStorage?.setItem(USER_LOCALE, action.payload)
    }
  }
})

export const { setUserLocale } = i18nSlice.actions
