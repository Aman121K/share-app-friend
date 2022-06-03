import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistedReducer = persistReducer({ storage: AsyncStorage, key: 'root' ,'whitelist':['details']}, userReducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)
  return { store, persistor }
}
