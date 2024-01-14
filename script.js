import { generaCard, indexCreazione, divContenitoreLibri, creaCard } from "./card.js";

const url = `https://striveschool-api.herokuapp.com/books`;

let arrayLibri = [];
let carrello = [];
let indexLettura;

const buttons = document.querySelectorAll("input");

const divContenitoreCart = document.getElementById("cart");
const totaleLibri = document.getElementById("totale-libri");
const ul = document.getElementById("lista");

function fetchFunct() {
  fetch(url, {})
    .then((resp) => resp.json())
    .then((libri) => {
      arrayLibri = libri;
      creaCard(libri);
    })
    .catch((e) => {
      console.log(e);
    });
}
window.onload = fetchFunct();

//mi prendo il value della text ed a seconda del nr caratteri (switch) esco uno o  l'altro risultato
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
      <button class="btn btn-secondary btn-sm" id="add-${indexCreazione}" onclick=operazioni(event)>aggiungi al carrello</button>
      <button class="btn btn-secondary btn-sm" id="del-${indexCreazione}" onclick=operazioni(event)>elimina</button>
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
          <button class="btn btn-secondary btn-sm" id="add-${indexCreazione}" onclick=operazioni(event)>aggiungi al carrello</button>
          <button class="btn btn-secondary btn-sm" id="del-${indexCreazione}" onclick=operazioni(event)>elimina</button>
          </div>
          </div>`;
      });
    default:
      alert("sono richiesti almeno 4 caratteri per la ricerca");
      break;
  }
}

//valuto in un'unica funzione il pulsante cliccato, richiamata da html: ho provato implementare l'addEventListener ma per poco tempo a disposizione, preferisco usare questo metodo
function operazioni(e) {
  const { target } = e;

  //mi prendo l'indice x poter gestire le diverse card
  indexLettura = target.id.split("-");

  //se il mio target ha un id che include add do per scontato che sia il pulsante aggiungi altrimenti elimina, cosi mi getisco le due operazioni
  if (target.id.includes("add")) {
    const badge = document.querySelector(`#badge-${indexLettura[1]}`);
    const card = document.querySelector(`#card-${indexLettura[1]}`);
    const cardBody = document.querySelector(`#card-body-${indexLettura[1]}`);

    card.classList.add("cardSelezionata");
    cardBody.classList.add("d-none");
    badge.classList.remove("d-none");

    aggiungiLibroAlCarrello(arrayLibri[indexLettura[1]].title, arrayLibri[indexLettura[1]].category, indexLettura[1]);
    renderCarrello();
  } else {
    document.querySelector(`#card-${indexLettura[1]}`).style.display = "none";
    console.log("cancellato");
  }
}
function aggiungiLibroAlCarrello(titolo, categoria, index) {
  const libriNelCarrello = { title: titolo, category: categoria, id: index };

  carrello.push(libriNelCarrello);
}

//mi aggiungo i titoli del libro selezionato facendo appendchild id un nuovo "li"
function renderCarrello() {
  const lista = document.createElement("li");

  carrello.forEach((x) => {
    lista.textContent = x.title;
    ul.appendChild(lista);
  });

  totaleLibri.innerText = ` ${carrello.length}`;
}

//resetto tutte le variabili che ho usato per costruire il carrello
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
    carrello = [];
  });
}
