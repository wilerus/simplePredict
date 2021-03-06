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
        const interpolatedImageData = this.interpolateImageData(croppedDrawData);
        return this.normalizeImageData(interpolatedImageData);
    }

    removeEmptyColumnAndRows(drawData) {
        const emptyRowsData = this.calculateEmptyRowsAndColumn(drawData);
        return this.cropImage(drawData, emptyRowsData);
    }

    interpolateImageData(imageData) {
        const pixelmap = imageData.pixelmap;
        const imageDimentions = imageData.dimentions;
    }

    calculateEmptyRowsAndColumn(imageData) {
        const pixelmap = imageData.data;
        const imageDimentionsWidth = imageData.width;
        let isRowEmpty = true;

        let freeRowsFromLeft = imageDimentionsWidth;
        let freeRowsFromRight = 0;
        let freeColumnsFromTop = imageData.height;
        let freeColumnsFromBottom = 0;
        let oldColumnPosition = 0;

        for (let pixelMapPosition = 0; pixelMapPosition < pixelmap.length; pixelMapPosition+=4) {
            const columnPosition = Math.floor(pixelMapPosition / imageDimentionsWidth / 4);
            if (oldColumnPosition !== columnPosition) {
                if (!isRowEmpty) {
                    if (freeColumnsFromTop > oldColumnPosition) {
                        freeColumnsFromTop = oldColumnPosition - 1 > 0 ? oldColumnPosition - 1 : 0;
                    }
                    if (freeColumnsFromBottom < oldColumnPosition) {
                        freeColumnsFromBottom = oldColumnPosition + 1 < imageData.height ? oldColumnPosition + 1 : oldColumnPosition;
                    }
                }
                oldColumnPosition = columnPosition;
                isRowEmpty = true;
            }
            if (this.__isFilled(pixelmap.slice(pixelMapPosition, pixelMapPosition + 4))) {
                isRowEmpty = false;
                const matrixPosition = pixelMapPosition / 4 - columnPosition * imageDimentionsWidth;
                if (matrixPosition < freeRowsFromLeft) {
                    freeRowsFromLeft = matrixPosition - 1 > 0 ? matrixPosition - 1 : 0;
                }
                if (matrixPosition > freeRowsFromRight) {
                    freeRowsFromRight = matrixPosition + 1 < imageDimentionsWidth ? matrixPosition + 1 : imageDimentionsWidth;
                }
            }
        }
        return { freeRowsFromLeft, freeRowsFromRight, freeColumnsFromTop, freeColumnsFromBottom };
    }

    cropImage(imageData, emptyRowsData) {
        const pixelmap = imageData.data;
        const imageDimentionsWidth = imageData.width;

        return pixelmap.filter((value, pixelMapPosition) => {
            const columnPosition = Math.floor(pixelMapPosition / imageDimentionsWidth / 4);
            const currentPosition = Math.floor(pixelMapPosition / 4 - columnPosition * imageDimentionsWidth);
                       
            return currentPosition > emptyRowsData.freeRowsFromLeft &&
                currentPosition < emptyRowsData.freeRowsFromRight &&
                columnPosition > emptyRowsData.freeColumnsFromTop &&
                columnPosition < emptyRowsData.freeColumnsFromBottom;
        });
    }

    __isFilled(pixel) {
        return pixel.some(property => property !== 0);
    }

    normalizeImageData() {

    }
};
customElements.define('main-application', MainApplication);
