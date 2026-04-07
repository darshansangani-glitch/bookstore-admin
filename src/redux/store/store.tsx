import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/slice/authSlice'
import { persistReducer, persistStore } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
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

// const reducer = combineReducers({
//     persistent: persistentReducer,
// });

// export const store = configureStore({
//     reducer: reducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//         serializableCheck: false,
//     })
// })

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch






// export const store = configureStore({
//   reducer,
//   middleware: getDefaultMiddleware({ 
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//     }
//   })
// });

// export const persistor = persistStore(store);




// import { createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import authReducer from '../features/slice/authSlice'

// // Redux Persist configuration
// const persistConfig = {
//   key: 'root',  // the key for the persist state in storage
//   storage,      // the storage engine to use (localStorage in this case)
// };

// // Wrap the root reducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, authReducer);

// // Create the Redux store with the persisted reducer
// const store = createStore(
//   persistedReducer
// );

// // Create a persistor, which will be used to persist and rehydrate the store
// const persistor = persistStore(store);

// export { store, persistor };