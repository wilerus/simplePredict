class ApplicationInput extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
              :host { display: flex; flex:1; background-color:red; flex-direction:column;}
              .button {width:56px; height:26px;}
          </style>
          <drawing-canvas></drawing-canvas>
          <div class='button-group'>
          <button class='button'>Save</button>
          <button class='button'>Redraw</button>
          </div>
      `;
        this.item = shadowRoot.querySelector('.red-div');
    }
};
customElements.define('application-input', ApplicationInput);