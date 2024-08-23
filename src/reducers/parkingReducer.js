import { SET_PARKING_SPACES, REGISTER_CAR, UNREGISTER_CAR } from "../actions/parkingActions";

const initialState = {
  spaces: [],
  cars: {} 
};

const parkingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PARKING_SPACES:
      return {
        ...state,
        spaces: Array.from({ length: action.payload }, (_, index) => index + 1),
        cars: {} 
      };
    case REGISTER_CAR:
      return {
        ...state,
        cars: {
          ...state.cars,
          [action.payload.space]: action.payload.registrationNo
        }
      };
    case UNREGISTER_CAR:
      const { [action.payload]: removed, ...remainingCars } = state.cars;
      return {
        ...state,
        cars: remainingCars
      };
    default:
      return state;
  }
};

export default parkingReducer;
