import { configureStore } from '@reduxjs/toolkit'
import { enableMapSet } from 'immer'

import { i18nSlice } from '../i18n/store'

import userReducer from './userSlice'

enableMapSet()

export const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat()
})
export type AppDispatch = typeof store.dispatch
export type GetState = typeof store.getState
export type RootState = ReturnType<GetState>

export { useTypedSelector, useTypedDispatch } from './hooks'
