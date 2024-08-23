export const SET_PARKING_SPACES = "SET_PARKING_SPACES";
export const REGISTER_CAR = "REGISTER_CAR";
export const UNREGISTER_CAR = "UNREGISTER_CAR";

export const setParkingSpaces = (numberOfSpaces) => ({
  type: SET_PARKING_SPACES,
  payload: numberOfSpaces,
});

export const registerCar = (space, registrationNo) => ({
  type: REGISTER_CAR,
  payload: { space, registrationNo }
});

export const unregisterCar = (space) => ({
  type: UNREGISTER_CAR,
  payload: space
});





