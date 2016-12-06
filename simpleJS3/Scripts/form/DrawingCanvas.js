class DrawingCanvas extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
              :host { display: flex;  height:100%; width:50%; align-items: center; align-content: center; }
              .drawingCanvas { display: inline-block; background-color:white; height:128px;  width:128px; padding:0.5rem;}              
          </style>
          <canvas class='drawingCanvas' id="myCanvas"></canvas>
      `;
        this.canvas = shadowRoot.querySelector('#myCanvas');
        this.__initCanvas();        
    }

    __initCanvas() {
        this.ctx = this.canvas.getContext('2d');
        this.mouse = { x: 0, y: 0 };

        this.canvas.width = 128;
        this.canvas.height = 128;

        this.canvas.addEventListener('mousemove', e => {
            this.mouse.x = e.pageX - this.offsetLeft;
            this.mouse.y = e.pageY - this.offsetTop;
        }, false);

        this.ctx.lineWidth = 12;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#00CC99';

        const __onPaint = ()=> {
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.stroke();
        };

        this.canvas.addEventListener('mousedown', e => {
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouse.x, this.mouse.y);

            this.canvas.addEventListener('mousemove', __onPaint, false);
        }, false);

        this.canvas.addEventListener('mouseup', () => {
            this.canvas.removeEventListener('mousemove', __onPaint, false);
        }, false);
    }
};

customElements.define('drawing-canvas', DrawingCanvas);
