var colors = ["#f5427e", "#c542f5", "#5d42f5", "#428df5", "#42f5b6"];

var elemcolor = document.getElementsByClassName("random_color");
Array.prototype.forEach.call(elemcolor, element => {
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  element.style.backgroundColor = random_color;
});
