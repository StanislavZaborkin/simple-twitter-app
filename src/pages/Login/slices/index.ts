import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../interfaces/user.ts';

export interface AuthSliceState {
  user: User;
  loggedIn: boolean;
  loading: boolean;
}

export interface AuthLogin {
  username: string;
  password: string;
}

const initialState: AuthSliceState = {
  user: {} as User,
  loggedIn: false,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: () => ({
    loginRequest(state, _action: PayloadAction<AuthLogin>) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loggedIn = true;
      state.loading = false;
    },
    loginError(state) {
      state.loading = false;
    },
    logout(state) {
      state.user = {} as User;
      state.loggedIn = false;
    },
  }),
  selectors: {
    selectUser: (auth) => auth.user,
    selectLoggedIn: (auth) => auth.loggedIn,
    selectLoading: (auth) => auth.loading,
  },
});

export const { loginRequest, loginSuccess, loginError, logout } =
  authSlice.actions;

export const { selectUser, selectLoggedIn, selectLoading } =
  authSlice.selectors;
