import { ElementCard } from "/components/element-card.js";
const cardsTop = document.querySelector("#cards-top");




const getCardsTop = async ()=>{
let respuesta = await(await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?level=12&num=5&offset=1")).json();
console.log(respuesta)
for(let i=0; i<respuesta.data.length; i++){
    const elementCard = new ElementCard(respuesta.data[i]);
    cardsTop.appendChild(elementCard)
}
}
cardsTop.addEventListener("click",(e)=>{
    alert(e.target.id)
    
})
getCardsTop()