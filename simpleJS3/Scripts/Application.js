/**
 * Application start point
 * @constructor
 */

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
</div>`;

      document.addEventListener('canvas:received:drawData', e => this.recognizeImage(e.detail), false);
    }

    recognizeImage(drawData) {
      const reducedImageData = this.reduceImage(drawData);
      //this.predictionsModule.recognizeImage(reducedImageData);
    }

    reduceImage(drawData) {
      const croppedDrawData = this.removeEmptyColumnAndRows(drawData);
      return this.interpolateImageData(croppedDrawData);
    }

    static removeEmptyColumnAndRows(drawData) {
      const emptyRowsData = this.calculateEmptyRowsAndColumn(drawData);
      return this.cropImage(drawData, emptyRowsData);
    }

    static interpolateImageData(imageData) {
       const pixelmap = imageData.pixelmap;
       const imageDimentions = imageData.dimentions;
    }

    static calculateEmptyRowsAndColumn(imageDimentions) {

    }

    static cropImage(drawData, emptyRowsData) {
        const pixelmap = imageData.pixelmap;
        const imageDimentionsWidth = imageData.dimentions.width - 1;
        const freeRowsFromLeft = 0;
        const freeRowsFromRight = 0;
        const freeColumnsFromTop = 0;
        const freeColumnsFromBottom = 0;

      for (let pixelMapPosition = 0; pixelMapPosition < pixelmap.length; pixelMapPosition++) {
          let columnPosition = pixelMapPosition / imageDimentionsWidth;
          if (this.__isEmpty(pixelmap[pixelMapPosition])) {
              pixelMapPosition > freeRowsFromLeft && freeRowsFromLeft = pixelMapPosition;
          }
      }
    }

    static __isEmpty(pixel) {
        debugger
    }
};
customElements.define('main-application', MainApplication);
