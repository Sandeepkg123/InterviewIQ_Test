import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: "user",
    initialstate:{
        userDate: null, 
    }
  },
  reducers: {
    setUserDate: (state, action) => {
      state.userDate = action.payload;
    },
  }
})

export const { setUserDate } = userSlice.actions
export default userSlice.reducer