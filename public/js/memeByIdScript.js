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
  image.setAttribute("crossorigin", "anonymous");
  image.src = document.getElementById("img-src").src;
  console.log(image.src);
}

// Download the image
var dlbutton = document.getElementById("downloadBtn");
dlbutton.addEventListener("click", function(e) {
  var dataURL = canvas.toDataURL();
  console.log(dataURL);
  dlbutton.href = dataURL;
  document.getElementById("saved").src = dataURL;

  // post request to add to DB

  var memeId = dlbutton.getAttribute("data-meme");

  var memeComment = {
    text: dataURL, // TO-DO: save the canvas url to Cloudinary, then save Cloudinary link to meme_me_db
    MemeId: memeId
  };
  // sendMemeToCloud();
  addCommentDB(memeComment);

// onclick send img to meme_me_db
fileUpload.addEventListener('change', function(event))

});

// send new comment URL to Cloudinary --- WIP

var myComment = cloudinary.v2.uploader.upload(
  {
    cloudName: "edwardphill",
    uploadPreset: "ukabfmkd"
  },
  (error, result) => {
    if (error) throw error;
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      let userid = 1;
      let Meme = {};
      Meme.image_url = result.info.secure_url;
      Meme.UserId = userid;
      axios({
        url: "/api/comments",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: Meme
      }).then(() => {
        console.log("meme comment uploaded to Cloudinary");
        alert("Nice job, your meme is up and running!");
        window.location.href = "/meme";
      });
    }
  }
);

//Post the image

var postButton = document.getElementById("postBtn");
postButton.addEventListener("click", function(e) {
  var dataURL = canvas.toDataURL();
  console.log(dataURL);
  //dataURL is the image url
});

window.topLineText = "";
window.bottomLineText = "";
var input1 = document.getElementById("topLineText");
var input2 = document.getElementById("bottomLineText");
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
handleFileSelect();
// document.querySelector("button").addEventListener("click", saveFile, false);
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll("button.typechoice");
  for (const button of buttons) {
    button.addEventListener("click", function(buttonvalue) {
      buttonvalue = this.value;
      console.log(buttonvalue);
      changeFont(buttonvalue);
    });
  }
  const sizechange = document.querySelectorAll("button.sizechange");
  for (const size of sizechange) {
    size.addEventListener("click", function(buttonvalue) {
      buttonvalue = this.value;
      if (buttonvalue === "plus") {
        fontsize += 2;
      } else {
        fontsize -= 2;
      }
      redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
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

// Code for liking and disliking comments
let addLikeButtons = $(".add-like");

addLikeButtons.click(event => {
  console.log(event);
  let commentId = event.target.dataset.commentid;
  let like = {};
  like.up_or_down = event.target.dataset.likebool;
  like.CommentId = commentId;
  axios({
    url: "/api/likes",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: like
  }).then(response => {
    window.location.reload(true);
  });
});

// Post request adding Comment to Comment Tabled SQL

const addCommentDB = comment => {
  axios({
    url: "/api/comments",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: comment
  }).then(() => {
    console.log("Nice job! Your meme has been added to the SQL database.");
    window.location.href = "/meme/:id";
  });
};
