const url = `https://striveschool-api.herokuapp.com/books`;
let arrayFetch = [];

const fetchFunct = () => {
  fetch(url, {})
    .then((resp) => resp.json())
    .then((cacca) => {
      arrayFetch = cacca;
      console.log(arrayFetch);
    })
    .catc((e) => {
      console.log(e);
    });
};

fetchFunct();
