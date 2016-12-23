class MenuItem extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
              .menu-item { display: inline-block; height:3rem; flex: 1; padding:0.5rem; border-bottom:1px solid gray; display: block;}              
          </style>
          <div class="menu-item"></div>
      `;
        this.item = shadowRoot.querySelector('.menu-item');
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