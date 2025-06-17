import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  inited: boolean
  email: string | null
}

const initialState: UserState = {
  inited: false,
  email: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
      state.inited = true
    },
    setInited: (state, action: PayloadAction<boolean>) => {
      state.inited = action.payload
    },
    clearUserEmail: (state) => {
      state.email = null
      state.inited = true
    }
  }
})

export const { setUserEmail, clearUserEmail, setInited } = userSlice.actions
export default userSlice.reducer
