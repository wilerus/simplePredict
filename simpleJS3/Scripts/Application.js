class MainApplication extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.innerHTML = `
          <style>
              :host { display: flex; background-color:rgba(0,0,255,0.1); height:100%; width:100%; flex-direction: column; align-items: stretch; align-content: stretch;}
              .appMenu{width:50%;}
            .toolbar{width: 100%; height: 3rem; background-color:white; z-index:2;}
            .content{display: flex; flex-direction: row; flex:1;}
          </style>
<application-toolbar class='toolbar'></application-toolbar>
<div class='content'>
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
</div>
      `;
      this.addEventListener('canvas:received:drawData', function (e, drawData) {
        debugger
        this.recognizeImage(drawData);
          // e.target соотетствует объекту document
    }, false);
    }

    recognizeImage(drawData) {
      const reducedImageData = this.reduceImage(drawData);
      this.predictionsModue.recognizeImage(reducedImageData);
    }

    reduceImage(drawData) {
      const cropedDrawData = this.removeEmptyColumnAndRows(drawData);
      return this.interpolateImageData(cropedDrawData);
    }

    removeEmptyColumnAndRows(drawData) {
      const emptyRowsData = this.calculateEmptyRowsAndColumn(drawData);
      return this.cropImage(drawData, emptyRowsData);
    }

    interpolatedImageData(imageData) {
       const pixelmap = imageData.pixelmap;
       const imageDimentions = imageData.dimentions;
    }

    calculateEmptyRowsAndColumn(imageDimentions) {

    }

    cropImage(drawData, emptyRowsData) {
      const pixelmap = imageData.pixelmap;
      const imageDimentions = imageData.dimentions;
    }
};
customElements.define('main-application', MainApplication);
