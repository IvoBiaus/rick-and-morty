const API_BASE_URL = "https://rickandmortyapi.com/api";

export const fetchPage = async (page) => {
  return fetch(`${API_BASE_URL}/character/?page=${page}`).then((res) =>
    res.json()
  );
};

export const fetchCharacter = async (id) => {
  return fetch(`${API_BASE_URL}/character/${id}`).then((res) => res.json());
};

export const fetchCharacterEpisodes = async (episodesUrls) => {
  const episodesIds = episodesUrls.map((url) =>
    url.replace(`${API_BASE_URL}/episode/`, "")
  );
  return fetch(`${API_BASE_URL}/episode/${episodesIds}`).then((res) =>
    res.json()
  );
};
