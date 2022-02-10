import { PATHS } from "./constants";
import CharacterDetail from "./screens/characterDetail";
import CharacterList from "./screens/characterList";

const ROUTES = [
  {
    element: <CharacterList />,
    path: PATHS.BASE_URL,
  },
  {
    element: <CharacterDetail />,
    path: PATHS.DETAIL,
  },
];

export default ROUTES;
