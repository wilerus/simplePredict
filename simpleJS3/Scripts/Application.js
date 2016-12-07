class MainApplication extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
              :host { display: flex; background-color:rgba(0,0,255,0.1); height:100%; width:100%; flex-direction: row; justify-content: space-around; align-items: stretch;
    align-content: stretch;}
              .appMenu{width:50%;}
          </style>
        <application-menu class='appMenu' model='{
    "values": [{
        "title": "big title"
      },      {
        "title": "big title"
      },      {
        "title": "big title"
      },      {
        "title": "big title"
      },      {
        "title": "big title"
      },      {
        "title": "big title"
      },      {
        "title": "big title"
      },      {
        "title": "big title"
      }
    ]
  }'></application-menu>
<application-input><application-input>
      `;
    }
};
customElements.define('main-application', MainApplication);