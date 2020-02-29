var colors = ["#f5427e", "#c542f5", "#5d42f5", "#428df5", "#42f5b6"];

var elemcolor = document.getElementsByClassName("random_color");
function randomcolorchange() {
  Array.prototype.forEach.call(elemcolor, element => {
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    element.style.backgroundColor = random_color;
  });
}
setInterval(randomcolorchange, 1000);
randomcolorchange();

//uncomment this for transition whole thing together

// function colortransition() {
//   var random_color = colors[Math.floor(Math.random() * colors.length)];
//   $(".random_color").animate(
//     {
//       backgroundColor: random_color
//     },
//     1000
//   );
// }
// setInterval(colortransition, 1000);
// colortransition();

var memeHolders = document.querySelectorAll(".meme-holder-card");

memeHolders.forEach(element => {
  element.addEventListener("click", event => {
    let memeId = event.currentTarget.id;
    window.location = window.location.href + "meme/" + memeId;
  });
});
