const cardDetail = document.getElementById("cardDetail");

export function creaCard(libro) {
  const card = `
  <div class="card" style="width: 18rem" >
  <img src="${libro.img}" class="card-img-top" alt="..." />
    <div class="card-body d-flex flex-column justify-content-between" id="card-body-${libro.asin}">
    <h5 class="card-title">${libro.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${libro.category}</h6>
    <div class="d-flex flex-column mb-2 gap-2">
    <p>Prezzo: ${libro.price} €</p>   
    </div>
    </div></div>`;

  cardDetail.innerHTML = card;
}
