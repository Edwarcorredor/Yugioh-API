import { ElementCard } from "components/element-card.js";
const buscador = document.querySelector("#buscador");
const btnChange = document.querySelectorAll(".btn-change");
let formulario
let offset = 0;
let page =0;

const getCardsFilter = async (data) => {
  let respuesta = ""
  switch(parseInt(data.filtro)){
    case 0:{
      respuesta = await (await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${data.entrada}&num=20&offset=${offset}`)).json();
      break;
    };
    case 1:{
      respuesta = await (await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?attribute=${data.entrada}&num=20&offset=${offset}`)).json();
      break;
    };
    case 2:{
      respuesta = await (await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?race=${data.entrada}&num=20&offset=${offset}`)).json();
      break;
    };
    case 3:{
      respuesta = await (await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?level=${data.entrada}&num=20&offset=${offset}`)).json();
      break;
    };
  }
  mostrarCardsFilter(respuesta)
}


const mostrarCardsFilter = async (respuesta) => {
  const cardsFilter = document.querySelector("#cards-filter");
  cardsFilter.innerHTML=""
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
buscador.addEventListener("submit",(e) => {
  e.preventDefault();
  formulario = Object.fromEntries(new FormData(e.target))
  e.target.reset()
  getCardsFilter(formulario)
})
btnChange[0].addEventListener("click", (e)=>{
  if(page !== 0){
    page -= 1;
    offset = page * 20
    getCardsFilter(formulario);
  }
})
btnChange[1].addEventListener("click", (e)=>{
  page += 1;
  offset = page * 20
  getCardsFilter(formulario);
})