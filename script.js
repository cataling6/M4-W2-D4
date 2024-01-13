const url = `https://striveschool-api.herokuapp.com/books`;
let arrayFetch = [];
let nrCard = [];
const fetchFunct = () => {
  fetch(url, {})
    .then((resp) => resp.json())
    .then((cacca) => {
      arrayFetch = cacca;
      for (let i = 0; i < cacca.length; i++) {
        divContenitore.innerHTML += `<div class="card" style="width: 18rem">
  <img src="${cacca[i].img}" class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${cacca[i].title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${cacca[i].category}</h6>
    <input type="submit" value="aggiungi">
    </div>`;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

fetchFunct();

const divContenitore = document.getElementById("books");

function creaCard() {
  // for (let i = 0; i < nrCard.length; i++) {
  //   divContenitore.innerHTML += `<div class="card" style="width: 18rem">
  // <img src="${{ nrCard }.img}" class="card-img-top" alt="..." />
  // <div class="card-body">
  //   <h5 class="card-title">${nrCard.title}</h5>
  //   <h6 class="card-subtitle mb-2 text-muted">${nrCard.category}</h6>
  //   <input type="submit" placeholder="Aggiungi">
  //   b5
  // </div>`;
  //   console.log(nrCard);
  // }
}

creaCard(arrayFetch);
