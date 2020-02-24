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
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  if (image != null) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Text attributes
  ctx.font = "30pt Impact";
  ctx.textAlign = "center";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.fillStyle = "white";

  if (topLine != null) {
    ctx.fillText(topLine, canvas.width / 2, 40);
    ctx.strokeText(topLine, canvas.width / 2, 40);
  }

  if (bottomLine != null) {
    ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
  }
}

function changeFont() {
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  const font = "Impact";
  switch (font) {
    case script:
      ctx.font = "30pt Great Vibes";
      break;
    case typewriter:
  }
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
    console.log("this", document.getElementById("img-src").src);
    window.imageSrc = document.getElementById("img-src");
    redrawMeme(window.imageSrc, null, null);
  };

  //   // Set image data to background image.
  //   image.src = "https://mdn.mozillademos.org/files/5397/rhino.jpg";
  //   console.log(image.src);
  image.src = document.getElementById("img-src").src;
  console.log(image.src);
}

window.topLineText = "";
window.bottomLineText = "";
var input1 = document.getElementById("topLineText");
var input2 = document.getElementById("bottomLineText");
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
handleFileSelect();
document.querySelector("button").addEventListener("click", saveFile, false);
