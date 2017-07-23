/*
 * action types
 */

export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const UPDATE_BEEKS = "UPDATE_BEEKS";

/*
 * action creators
 */

export function updateLocation(location) {
  return { type: UPDATE_LOCATION, location };
}

export function updateBeeks(beeks) {
  return { type: UPDATE_BEEKS, beeks };
}
