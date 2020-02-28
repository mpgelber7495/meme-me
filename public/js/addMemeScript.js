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
      let Meme = {};
      Meme.image_url = result.info.secure_url;
      axios({
        url: "/api/memes",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: Meme
      }).then(() => {
        console.log("Image uploaded to CDN and to API");
        alert("Noice job! Your meme is up and running!!");
        window.location.href = "/";
      });
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
