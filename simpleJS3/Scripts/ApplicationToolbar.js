class ApplicationToolbar extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
            .toolbar{ width: 100%; height: 3rem; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);}
          </style>
            <div class ='toolbar'></div>
      `;
    }
};
customElements.define('application-toolbar', ApplicationToolbar);