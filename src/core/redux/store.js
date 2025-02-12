import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodosSliceReducer from './reducers/todosSlice.reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login'],
};

const reducers = combineReducers({
  todos: TodosSliceReducer,

});


const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({ 
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        serializableCheck: false,
        warnAfter: 200,
        ignoredActionPaths: ['register', 'rehydrate'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
