import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import createReducer from '../reducers/index.ts';
import rootSaga from '../sagas/index.ts';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['home'],
};

const rootReducer = createReducer();
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

const setUpStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    // Pass previously created persisted reducer
    reducer: persistedReducer,
    // Add our middlewares
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middlewares);
    },
    // Turn off devtools in production
    // devTools: import.meta.env.DEV,
    devTools: true,
  });

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);
  return { store, persistor };
};

export const { store } = setUpStore();

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
