import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userReducer, orderReducer, orderListReducer, usersReducer } from './reducers';
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import createSecureStore from "redux-persist-expo-securestore";

const storage = createSecureStore();

const config = {
  key: "token",
  storage,
  blacklist: ['token']
};

const rootReducer = combineReducers({
  user: persistReducer(config, userReducer),
  order: orderReducer,
  zakupki: orderListReducer,
  users: usersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store , persistor};
