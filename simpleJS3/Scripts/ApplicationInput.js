class ApplicationInput extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
              :host { display: flex; flex:1; background-color:red; flex-direction:column;}
              .button {width:56px; height:26px;}
              .button-group {display:flex; flex-direction:row; justify-content: space-around;}
          </style>
          <drawing-canvas></drawing-canvas>
          <div class='button-group'>
            <button class='button'>Save</button>
            <button class='button'>Redraw</button>
          </div>
      `;
    }
};
customElements.define('application-input', ApplicationInput);