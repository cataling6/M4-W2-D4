export let libro = {};

export const fetchFunct = (url, callback) => {
  return fetch(url)
    .then((resp) => resp.json())
    .then((libri) => {
      libro = libri;
    })
    .catch((e) => {
      console.log("Errore: ", e);
    });
};
