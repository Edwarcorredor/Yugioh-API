export class ElementCard extends HTMLElement {
    
    constructor(card) {
      super();
      this.attachShadow({ mode: "open" });
      this.infoCard = card;
      this.styleSheet = this.style(card.card_images[0].image_url);
      
    }
  
    connectedCallback() {
      this.render();
    }
  
    style(imagen = "/src/reverso.jpg") {
      return /*css*/ `
        .card {
          margin: 10px;  
          font-weight: bold;
          padding: 1em;
          text-align: right;
          color: #181a1a;
          width: 168px;
          height: 250px;
          box-shadow: 0 1px 5px #00000099;
          border-radius: 10px;
          background-image: url(${imagen});
          background-size: cover;
          position: relative;
          transition-duration: 300ms;
          transition-property: transform, box-shadow;
          transition-timing-function: ease-out;
          transform: rotate3d(0);
        }
        
        .card:hover {
          transition-duration: 150ms;
          box-shadow: 0 5px 20px 5px #00000044;
        }
        
        .card .glow {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background-image: radial-gradient(circle at 50% -20%, #ffffff22, #0000000f);
        }
      `;
    }
  
    cardMove() {
      const $card = this.shadowRoot.querySelector('.card');
      let bounds;
  
      function rotateToMouse(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
          x: leftX - bounds.width / 2,
          y: topY - bounds.height / 2
        }
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
  
        $card.style.transform = `
          scale3d(1.07, 1.07, 1.07)
          rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.log(distance) * 2}deg
          )
        `;
  
        $card.querySelector('.glow').style.backgroundImage = `
          radial-gradient(
          circle at
          ${center.x * 2 + bounds.width / 2}px
          ${center.y * 2 + bounds.height / 2}px,
          #ffffff55,
          #0000000f
          )
        `;
      }
  
      $card.addEventListener('mouseenter', () => {
        bounds = $card.getBoundingClientRect();
        document.addEventListener('mousemove', rotateToMouse);
      });
  
      $card.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', rotateToMouse);
        $card.style.transform = '';
        $card.style.background = '';
      });
    }
  
    render(){
        this.shadowRoot.innerHTML = /* html*/`
        <style>${this.styleSheet}</style>
        <div class="card">
          <div class="glow"></div>
        </div> 
      `;
      this.cardMove();
    }
}

customElements.define("element-card", ElementCard);
  