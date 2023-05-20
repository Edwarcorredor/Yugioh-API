import { ElementCard } from "/components/element-card.js";
const cardsTop = document.querySelector("#cards-top");

for(let i = 0; i < 5; i++) {
const elementCard = new ElementCard()
cardsTop.appendChild(elementCard)
}