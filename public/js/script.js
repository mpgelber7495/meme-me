const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/edwardphill/upload";
const CLOUDINARY_UPLOAD_PRESET = "ukabfmkd";

var imgPreview = document.getElementById("img-preview");
var fileUpload = document.getElementById("file-upload");

fileUpload.addEventListener("change", function(event) {
  var file = event.target.files[0];
  var formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  axios({
    url: CLOUDINARY_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: formData
  })
    .then(function(res) {
      let userid = 1;
      console.log(res);
      let Meme = {};
      Meme.image_url = res.data.sercure_url;
      Meme.UserId = userid;
      console.log("MEME:::::" + Meme);
      axios({
        url: "/api/memes",
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        data: Meme
      }).then(console.log("WAHOO"));
    })
    .catch(function(err) {
      console.log(err);
    });
});
