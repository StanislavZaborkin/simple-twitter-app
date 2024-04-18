import { createAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
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

interface AuthLoginRequest extends AuthLogin {
  callback: () => void;
}

const initialState: AuthSliceState = {
  user: {} as User,
  loggedIn: false,
  loading: false,
};

export const logout = createAction('auth/logout');

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: () => ({
    loginRequest(state, _action: PayloadAction<AuthLoginRequest>) {
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
  }),
  selectors: {
    selectUser: (auth) => auth.user,
    selectLoggedIn: (auth) => auth.loggedIn,
    selectLoading: (auth) => auth.loading,
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });
  },
});

export const { loginRequest, loginSuccess, loginError } = authSlice.actions;

export const { selectUser, selectLoggedIn, selectLoading } =
  authSlice.selectors;
