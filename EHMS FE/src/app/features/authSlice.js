import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    role: null,
    refreshToken: null,
    userId: null,
  },
  reducers: {
    //setCredential methods

    setCredentials: (state, action) => {
      const { user, acessToken, role, refreshToken, userId } = action.payload;

      state.user = user;
      state.token = acessToken;
      state.role = role;
      state.refreshToken = refreshToken;
      state.userId = userId;
    },
    //logout method
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.refreshToken = null;
      state.id = null;
    },
    updateToken: (state, action) => {
      const { acessToken } = action.payload;
      state.token = acessToken;
    },
  },
});

export const { setCredentials, logOut, updateToken } = authSlice.actions;

export default authSlice.reducer;
// export const selectCurrentUser = (state) =>  state.auth.user
// export const selectCurrentToken = (state) =>  ( state.auth.token)
