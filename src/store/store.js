import { createStore, combineReducers } from "redux";
import parkingReducer from "../reducers/parkingReducer";

const rootReducer = combineReducers({
  parking: parkingReducer,
});

const store = createStore(rootReducer);

export default store;


