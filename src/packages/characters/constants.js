export const REDUCER_INDEX = "characters";
export const BASE_URL = `/${REDUCER_INDEX}`;

export const PATHS = {
  BASE_URL,
  DETAIL: `${BASE_URL}/character/:characterId`,
};

export const getRouteToCharecterDetail = (characterId) =>
  PATHS.DETAIL.replace(":characterId", characterId);
