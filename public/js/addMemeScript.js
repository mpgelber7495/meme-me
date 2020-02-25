document.getElementById("upload-new-meme").style.display = "none";

var myWidget = cloudinary.createUploadWidget(
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
        url: "/api/memes",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: Meme
      }).then(console.log("Image uploaded to CDN and to API"));
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function() {
    myWidget.open();
  },
  false
);
