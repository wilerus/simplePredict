class ApplicationMenu extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
              .menu-container {flex-direction: column; display: flex; width:100%; background-color:white; height:100%; padding:1rem; box-sizing: border-box;}
          </style>          
          <div class="menu-container"></div>
      `;
        this.menuContainer = shadowRoot.querySelector('.menu-container');
    }

    static get observedAttributes() { return ['model']; }

    attributeChangedCallback(name, oldValue, newValue, namespaceURI) {
        if (name === 'model') {
            this.__updateMenuItems(JSON.parse(newValue));
        }
    }

    __updateMenuItems(model) {
        model.values.forEach(value => {
            const newMenuItem = document.createElement("menu-item");
            newMenuItem.title = value.title;
            this.menuContainer.appendChild(newMenuItem);
        })
    }

    get model() { return this.getAttribute('model'); }
    set model(newValue) { this.setAttribute('model', newValue); }
};
customElements.define('application-menu', ApplicationMenu);