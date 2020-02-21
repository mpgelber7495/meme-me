(function() {
  var uploadButtonRoute = document.getElementById("upload-button");
  uploadButtonRoute.addEventListener("click", function() {
    console.log("Takes you to add meme page");
    window.location = window.location.href + "add-meme";
  });
})();
