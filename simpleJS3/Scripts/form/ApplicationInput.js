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
            <button class='button train'>Train</button>
          </div>
      `;
        this.saveButton = shadowRoot.querySelector('.save');
        this.redrawButton = shadowRoot.querySelector('.redraw');
        this.trainButton = shadowRoot.querySelector('.train');
        this.drawingCanvas = shadowRoot.querySelector('.drawing-canvas');
        this.saveButton.addEventListener('click', this.__saveCurrentFigure.bind(this));
        this.redrawButton.addEventListener('click', this.__redrawCanvas.bind(this));
        this.trainButton.addEventListener('click', this.__train.bind(this));
        this.__initPrediction();
    }

    __saveCurrentFigure() {
        const drawData = this.drawingCanvas.getCanvasData();
    }

    __redrawCanvas() {
        this.drawingCanvas.reset();
    }

    __outputResults(weight_deltas) {
        
        this.data.forEach(({input: [i1, i2], output: y}, i) =>
            console.log(`${i1} XOR ${i2} => ${weight_deltas[i]} (expected ${y})`));
    }

    __calculateResults() {
        const resultsList = this.data.map(({input: [i1, i2], output: y}) => Math.pow(y - nn(i1, i2), 2));
        const resultsListLength = resultsList.length;

        return resultsList.reduce((a, b) => a + b) / resultsListLength;
    }

    __train() {
        const weight_deltas = {
            i1_h1: 0,
            i2_h1: 0,
            bias_h1: 0,
            i1_h2: 0,
            i2_h2: 0,
            bias_h2: 0,
            h1_o1: 0,
            h2_o1: 0,
            bias_o1: 0,
        };

        for (var {input: [i1, i2], output} of this.data) {
            var h1_input =
                this.weights.i1_h1 * i1 +
                this.weights.i2_h1 * i2 +
                this.weights.bias_h1;
            var h1 = this.__activation_sigmoid(h1_input);

            var h2_input =
                this.weights.i1_h2 * i1 +
                this.weights.i2_h2 * i2 +
                this.weights.bias_h2;
            var h2 = this.__activation_sigmoid(h2_input);


            var o1_input =
                this.weights.h1_o1 * h1 +
                this.weights.h2_o1 * h2 +
                this.weights.bias_o1;

            var o1 = this.__activation_sigmoid(o1_input);
            
    
            var delta = output - o1;
            console.log(delta);

            var o1_delta = delta * this.__derivative_sigmoid(o1_input);

            weight_deltas.h1_o1 += h1 * o1_delta;
            weight_deltas.h2_o1 += h2 * o1_delta;
            weight_deltas.bias_o1 += o1_delta;

            var h1_delta = o1_delta * this.__derivative_sigmoid(h1_input);
            var h2_delta = o1_delta * this.__derivative_sigmoid(h2_input);

            weight_deltas.i1_h1 += i1 * h1_delta;
            weight_deltas.i2_h1 += i2 * h1_delta;
            weight_deltas.bias_h1 += h1_delta;

            weight_deltas.i1_h2 += i1 * h2_delta;
            weight_deltas.i2_h2 += i2 * h2_delta;
            weight_deltas.bias_h2 += h2_delta;
        }
        console.log('\n');
        this.__applyTrainUpdate(weight_deltas);
    }

    __activation_sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    __derivative_sigmoid(x) {
        const fx = this.__activation_sigmoid(x);
        return fx * (1 - fx);
    }

    doTimes(func, count) {
        for (let i = 0; i < count; i ++) func();
    }

    __applyTrainUpdate(weight_deltas) {
        Object.keys(this.weights).forEach(key =>
            this.weights[key] += weight_deltas[key]);
    }

    __initPrediction() {
        this.data = [
            { input: [0, 0], output: 0 },
            { input: [1, 0], output: 1 },
            { input: [0, 1], output: 1 },
            { input: [1, 1], output: 0 },
        ];

        this.weights = {
            i1_h1: Math.random(),
            i2_h1: Math.random(),
            bias_h1: Math.random(),
            i1_h2: Math.random(),
            i2_h2: Math.random(),
            bias_h2: Math.random(),
            h1_o1: Math.random(),
            h2_o1: Math.random(),
            bias_o1: Math.random(),
        };
    }
}

customElements.define('application-input', ApplicationInput);