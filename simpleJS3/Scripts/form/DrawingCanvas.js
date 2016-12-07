class DrawingCanvas extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
              :host { display: flex;  height:100%; width:100%; align-items: center; align-content: center; }
              .drawingCanvas { display: inline-block; background-color:white; height:100%;  width:100%;}              
          </style>
          <canvas class='drawingCanvas' id="myCanvas"></canvas>
      `;
        this.canvas = shadowRoot.querySelector('#myCanvas');
        this.__initCanvas();        
    }

    __initCanvas() {
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = this.canvas.getBoundingClientRect().width;
        this.canvas.height = this.canvas.getBoundingClientRect().height;

        this.ctx.lineWidth = 12;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#00CC99';

        const __onPaint = (e) => {
            this.ctx.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            this.ctx.stroke();
        };

        this.canvas.addEventListener('mousedown', e => {
            this.ctx.beginPath();
            this.ctx.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            this.canvas.addEventListener('mousemove', __onPaint, false);
        }, false);

        this.canvas.addEventListener('mouseup', () => {
            this.canvas.removeEventListener('mousemove', __onPaint, false);
        }, false);
    }
};

customElements.define('drawing-canvas', DrawingCanvas);
