export let indexCreazione;
export const divContenitoreLibri = document.getElementById("books");

export function creaCard(libri) {
  libri.map((x, indexCreazione) => {
    generaCard(x, indexCreazione);
  });
}

export function generaCard(x, indexCreazione) {
  indexCreazione + 1;
  divContenitoreLibri.innerHTML += `<div class="card" style="width: 18rem" id="card-${indexCreazione}">
      <div class="d-flex justify-content-between align-items-start mt-3"><img src="${x.img}" class="card-img-top" alt="..." /><p class="badge bg-secondary d-none" id="badge-${indexCreazione}">aggiunto</p></div>
      <div class="card-body d-flex flex-column justify-content-between" id="card-body-${indexCreazione}">
        <h5 class="card-title">${x.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${x.category}</h6>
        <div class="d-flex flex-column ">
        <button class="btn btn-secondary btn-sm mb-2" id="add-${indexCreazione}" onclick=operazioni(event)>aggiungi al carrello</button>
        <button class="btn btn-secondary btn-sm mb-2" id="del-${indexCreazione}" onclick=operazioni(event)>elimina</button>
        </div>
        </div>`;
}
