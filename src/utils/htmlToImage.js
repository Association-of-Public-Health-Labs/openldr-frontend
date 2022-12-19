import {toPng} from "html-to-image";
import download from "downloadjs";

function convertCardToImage(cardId) {
  if (cardId) {
    toPng(document.getElementById(cardId)).then(function(dataUrl) {
      download(dataUrl, cardId + ".png");
    });
  }
}

export default convertCardToImage;
