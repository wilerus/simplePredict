class MenuItem extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
              :host { display: flex; background-color:red; height:3rem;}
              .red-div { display: inline-block; height:100%;  width:100%; padding:0.5rem;}              
          </style>
          <div class="red-div"></div>
      `;
        this.item = shadowRoot.querySelector('.red-div');
    }

    static get observedAttributes() { return ['title']; }

    attributeChangedCallback(name, oldValue, newValue, namespaceURI) {
        if (name === 'title') {
            this.__updateTitle(newValue);
        }
    }

    __updateTitle(title) {
        this.item.innerHTML = title;
    }
};
customElements.define('menu-item', MenuItem);