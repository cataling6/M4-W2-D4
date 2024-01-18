// questo compito mi ha stremato*; ho sviluppato la parte dei detail con QS passando asin come parametro, a modo mio;
// non ho ignorato il discorso di modulare però mi sono accorto che debuggare questo compito forse è più doloros che buttarsi
//dal 3° piano; prossimo compito applicherò i moduli come si deve.
const url = `https://striveschool-api.herokuapp.com/books`;
const origin = window.location.origin + (window.location.protocol === "https:" ? "/M4-W2-D4" : "");

let arrayPrezzo = [];
let arrayLibri = [];
let carrello = [];
let indexCreazione;
let indexLettura;

window.svuotaCarrello = svuotaCarrello;

const buttons = document.querySelectorAll("input");
const divContenitoreLibri = document.getElementById("books");
const divContenitoreCart = document.getElementById("cart");
const totaleLibri = document.getElementById("totale-libri");
const totaleEuro = document.getElementById("totale-euro");
const ul = document.getElementById("lista");
const svuota = document.getElementById("svuota");

const fetchFunct = () => {
  fetch(url, {})
    .then((resp) => resp.json())
    .then((libri) => {
      arrayLibri = libri;
      creaCard(libri);
    })
    .catch((e) => {
      console.log(e);
    });
};
window.onload = fetchFunct();

function creaCard(libri) {
  libri.map((x, indexCreazione) => {
    indexCreazione + 1;

    divContenitoreLibri.innerHTML += `<div class="card" style="width: 18rem" id="card-${indexCreazione}">
  <div class="d-flex justify-content-between align-items-start mt-3"><img src="${x.img}" class="card-img-top" alt="..." /><p class="badge bg-secondary d-none" id="badge-${indexCreazione}"><i class="bi bi-cart-check"></i> aggiunto</p></div>
  <div class="card-body d-flex flex-column justify-content-between" id="card-body-${indexCreazione}">
    <h5 class="card-title">${x.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${x.category}</h6>
    <div class="d-flex flex-column mb-2 gap-2">
    <p>Prezzo: ${x.price} €</p>
    <button class="btn btn-secondary btn-sm mb-2" id="add-${indexCreazione}" onclick=operazioni(event)>aggiungi al carrello</button>
    <a class="btn btn-secondary btn-sm mb-2" id="det-${indexCreazione}" href="${origin}/details.html?id=${x.asin}" target="_blank">dettagli</a>
    <button class="btn btn-secondary btn-sm mb-2" id="del-${indexCreazione}" onclick=operazioni(event)>elimina</button>
    </div>
    </div>`;
  });
}

//aggiunto evento x pulsante invio
cercaTitolo.addEventListener("keydown", pressed);

function pressed(e) {
  if (e.code === "Enter") {
    cercaLibro();
  }
}

//valuto le due casistiche per la ricerca ed a seconda del risultato, genero le card
function cercaLibro() {
  const cercaTitolo = document.getElementById("cercaTitolo");
  const find = arrayLibri.filter((x) => x.title.toLowerCase().includes(cercaTitolo.value));

  switch (true) {
    case cercaTitolo.value.length > 3:
      divContenitoreLibri.innerHTML = "";

      find.map((x, indexCreazione) => {
        indexCreazione = 0;
        indexCreazione + 1;
        divContenitoreLibri.innerHTML += `<div class="card" style="width: 18rem" id="card-${indexCreazione}">
    <div class="d-flex justify-content-between align-items-start mt-3"><img src="${x.img}" class="card-img-top" alt="..." /><p class="badge bg-secondary d-none" id="badge-${indexCreazione}">aggiunto</p></div>
    <div class="card-body d-flex flex-column justify-content-between" id="card-body-${indexCreazione}">
      <h5 class="card-title">${x.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${x.category}</h6>
      <div class="d-flex flex-column mb-2 gap-2">
      <p>Prezzo: ${x.price}</p>
      <button class="btn btn-secondary btn-sm mb-2" id="add-${indexCreazione}" onclick=operazioni(event)>aggiungi al carrello</button>
      <a class="btn btn-secondary btn-sm mb-2" id="det-${indexCreazione}" href="${origin}/details.html?id=${x.asin}" target="_blank">dettagli</a>
      <button class="btn btn-secondary btn-sm mb-2" id="del-${indexCreazione}" onclick=operazioni(event)>elimina</button>
      </div>
      </div>`;
      });
      break;

    case cercaTitolo.value.length == 0:
      divContenitoreLibri.innerHTML = "";

      find.map((x, indexCreazione) => {
        indexCreazione = 0;
        indexCreazione + 1;
        divContenitoreLibri.innerHTML += `<div class="card" style="width: 18rem" id="card-${indexCreazione}">
    <div class="d-flex justify-content-between align-items-start mt-3"><img src="${x.img}" class="card-img-top" alt="..." /><p class="badge bg-secondary d-none" id="badge-${indexCreazione}">aggiunto</p></div>
    <div class="card-body d-flex flex-column justify-content-between" id="card-body-${indexCreazione}">
      <h5 class="card-title">${x.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${x.category}</h6>
      <div class="d-flex flex-column mb-2 gap-2">
      <p>Prezzo: ${x.price}</p>
      <button class="btn btn-secondary btn-sm mb-2" id="add-${indexCreazione}" onclick=operazioni(event)>aggiungi al carrello</button>
      <a class="btn btn-secondary btn-sm mb-2" id="det-${indexCreazione}" href="${origin}/details.html?id=${x.asin}" target="_blank">dettagli</a>
      <button class="btn btn-secondary btn-sm mb-2" id="del-${indexCreazione}" onclick=operazioni(event)>elimina</button>
      </div>
      </div>`;
      });
      break;

    default:
      alert("sono richiesti almeno 4 caratteri per la ricerca");
      break;
  }
}
window.operazioni = operazioni;

function operazioni(e) {
  const target = e.target;
  const cardId = target.closest(".card").id;
  const index = cardId.split("-")[1];
  const selectedBook = arrayLibri[index];

  //se il mio target ha un id che include add do per scontato che sia il pulsante aggiungi altrimenti elimina, cosi mi getisco le due operazioni
  if (target.matches(`#add-${index}`)) {
    const badge = document.querySelector(`#badge-${index}`);
    const card = document.querySelector(`#card-${index}`);
    const cardBody = document.querySelector(`#card-body-${index}`);

    card.classList.add("cardSelezionata");
    cardBody.classList.add("d-none");
    badge.classList.remove("d-none");

    aggiungiLibroAlCarrello(selectedBook.title, selectedBook.price, index);
    renderCarrello();
  } else if (target.matches(`#del-${index}`)) {
    document.querySelector(`#card-${index}`).style.display = "none";
  }
}
function aggiungiLibroAlCarrello(titolo, prezzo, index) {
  const libriNelCarrello = { title: titolo, price: prezzo, id: index };

  carrello.push(libriNelCarrello);
}

//creo la parte del carrello inserendo "li" ogni volta che clicco su aggiungi; sempre qui aggiorno anche il totale libri
function renderCarrello() {
  const lista = document.createElement("li");

  carrello.forEach((x) => {
    lista.textContent = x.title;
    ul.appendChild(lista);
    arrayPrezzo.push(x.price);
  });

  let totale = arrayPrezzo.reduce((acc, curr) => acc + curr);

  totaleLibri.innerText = ` ${carrello.length}`;
  totaleEuro.innerText = ` ${totale.toFixed(2)}`;
}

function svuotaCarrello() {
  const ul = document.getElementById("lista");

  ul.innerHTML = "";
  totaleLibri.innerText = "";

  carrello.forEach((x) => {
    const card = document.querySelector(`#card-${x.id}`);
    const cardBody = document.querySelector(`#card-body-${x.id}`);
    const badge = document.querySelector(`#badge-${x.id}`);

    card.classList.remove("cardSelezionata");
    cardBody.classList.remove("d-none");
    badge.classList.add("d-none");
    totaleEuro.innerText = "";

    carrello = [];
    arrayPrezzo = [];
  });
}
