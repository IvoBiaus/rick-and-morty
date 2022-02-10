export const fetchPage = async (page) => {
  return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(
    (res) => res.json()
  );
};
