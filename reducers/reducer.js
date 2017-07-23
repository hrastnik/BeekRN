import { UPDATE_LOCATION, UPDATE_BEEKS } from "../actions/actions";

const initialState = {
  location: {
    latitude: 0,
    longitude: 0
  },
  beeks: []
};

export default function reducerBeek(state = initialState, action) {
  console.log("reducerBeek::" + action.type);
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.location
      };
    case UPDATE_BEEKS:
      return {
        ...state,
        beeks: action.beeks
      };
    default:
      return state;
  }
}
