import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  email: string | null
}

const initialState: UserState = {
  email: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    clearUserEmail: (state) => {
      state.email = null
    }
  }
})

export const { setUserEmail, clearUserEmail } = userSlice.actions
export default userSlice.reducer
