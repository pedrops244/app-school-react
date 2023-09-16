import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'REACT-TEMPLATE',
      storage,
      whitelist: ['exampleReducer'],
    },
    reducers,
  );
  return persistedReducers;
};
