var fontsize = 30;
var fonttype = "Impact";
var fontstyle = "";
var fontfill = "white";
var fontstroke = 0;
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

function textChangeListener(evt) {
  var id = evt.target.id;
  var text = evt.target.value;

  if (id == "topLineText") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }

  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
  // Get Canvas2DContext

  if (image != null) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Text attributes
  ctx.font = `${fontstyle} ${fontsize}pt ${fonttype}`;
  ctx.textAlign = "center";
  //   ctx.strokeStyle = fontcolor;
  ctx.lineWidth = fontstroke;
  ctx.fillStyle = fontfill;

  if (topLine != null) {
    ctx.fillText(topLine, canvas.width / 2, 40);
    ctx.strokeText(topLine, canvas.width / 2, 40);
  }

  if (bottomLine != null) {
    ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
  }
}

function changeFont(value) {
  switch (value) {
    case "impact":
      fontstyle = "Normal";
      fonttype = "Impact";
      break;
    case "arial":
      fontstyle = "Normal";
      fonttype = "Arial";
      break;
    case "comic":
      fontstyle = "Normal";
      fonttype = "Comic Sans MS";
      break;
    case "cursive":
      fontstyle = "Normal";
      fonttype = "Cursive";
      break;
    case "italic":
      fontstyle = "Italic";
      fonttype = "Arial";
      break;
  }
  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function saveFile() {
  window.open(document.querySelector("canvas").toDataURL());
}

function handleFileSelect(evt) {
  var canvasWidth = 500;
  var canvasHeight = 500;
  // Create an image object
  var image = new Image();
  image.onload = function() {
    console.log("this", this);
    window.imageSrc = this;
    redrawMeme(window.imageSrc, null, null);
  };

  //   // Set image data to background image.
  //   image.src = "https://mdn.mozillademos.org/files/5397/rhino.jpg";
  //   console.log(image.src);
  image.src = document.getElementById("img-src").src;
  console.log(image.src);
}

function consoleThis() {
  console.log(this);
}
window.topLineText = "";
window.bottomLineText = "";
var input1 = document.getElementById("topLineText");
var input2 = document.getElementById("bottomLineText");
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
handleFileSelect();
document.querySelector("button").addEventListener("click", saveFile, false);
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll("button.typechoice");
  for (const button of buttons) {
    button.addEventListener("click", function(buttonvalue) {
      buttonvalue = this.value;
      console.log(buttonvalue);
      changeFont(buttonvalue);
    });
  }
  const colors = document.querySelectorAll("button.is-rounded");
  for (const color of colors) {
    color.addEventListener("click", function() {
      fontfill = this.value;
      console.log(fontfill);
      redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
    });
  }
});
