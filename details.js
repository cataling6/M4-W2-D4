import { fetchFunct, libro } from "./FetchLibri.js";
import { creaCard } from "./CardDetails.js";
const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const url = `https://striveschool-api.herokuapp.com/books/${id}`;

fetchFunct(url, (callback) => {
  console.log(callback);
}).then((libri) => {
  creaCard(libro);
});
