import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/slice/authSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage_raw from 'redux-persist/lib/storage';
const storage = (storage_raw as any).default || storage_raw;

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
