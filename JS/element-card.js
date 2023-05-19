class elementCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.cardmove()
    }
}
