import { ElementCard } from "/components/element-card.js";
const buscador = document.querySelector("#buscador")

const getCardsFilter = async () => {
    const cardsFilter = document.querySelector("#cards-filter");
    let respuesta = await (await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?level=12&num=20&offset=0")).json();
    let cardCount = 0;
    let rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container');
  
    for (let i = 0; i < respuesta.data.length; i++) {
      const elementCard = new ElementCard(respuesta.data[i]);
  
      if (cardCount === 0 || cardCount % 5 === 0) {
        // Crear un nuevo contenedor de fila
        rowContainer = document.createElement('div');
        rowContainer.classList.add('row-container');
        cardsFilter.appendChild(rowContainer);
      }
  
      rowContainer.appendChild(elementCard);
      cardCount++;
    }
  }
  

const getCardsTop = async ()=>{
const cardsTop = document.querySelector("#cards-top");
let respuesta = await(await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?level=12&num=5&offset=1")).json();
for(let i=0; i<respuesta.data.length; i++){
    const elementCard = new ElementCard(respuesta.data[i]);
    cardsTop.appendChild(elementCard)
}
}

getCardsTop()
getCardsFilter()