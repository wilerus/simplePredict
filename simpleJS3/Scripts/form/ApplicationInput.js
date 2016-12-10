class ApplicationInput extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
              :host { display: flex; flex:1; flex-direction:column;}
              .button {width:56px; height:26px;}
              .button-group {display:flex; flex-direction:row; justify-content: space-around;}
          </style>
          <drawing-canvas class='drawing-canvas'></drawing-canvas>
          <div class='button-group'>
            <button class='button save'>Save</button>
            <button class='button redraw'>Redraw</button>
          </div>
      `;
        this.saveButton = shadowRoot.querySelector('.save');
        this.redrawButton = shadowRoot.querySelector('.redraw');
        this.drawingCanvas = shadowRoot.querySelector('.drawing-canvas');
        this.saveButton.addEventListener('click', this.__saveCurrentFigure.bind(this));
        this.redrawButton.addEventListener('click', this.__redrawCanvas.bind(this));
    }

    __saveCurrentFigure() {
        this.drawingCanvas.getCanvasData();
    }

    __redrawCanvas() {
        this.drawingCanvas.reset();
    }
};
customElements.define('application-input', ApplicationInput);