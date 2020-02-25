function login(email, password, callback) {
  const mysql = require("mysql");
  const bcrypt = require("bcrypt");
  const axios = require("axios");

  axios
    .get("http://meme-me-app.herokuapp.com/api/users/by-email/" + [email])
    .then(function(response) {});

  const query =
    "SELECT id, nickname, email, password FROM Users WHERE email = ?";

  connection.query(query, [email], function(err, results) {
    if (err) return callback(err);
    if (results.length === 0)
      return callback(new WrongUsernameOrPasswordError(email));
    const user = results[0];

    bcrypt.compare(password, user.password, function(err, isValid) {
      if (err || !isValid)
        return callback(err || new WrongUsernameOrPasswordError(email));

      callback(null, {
        user_id: user.id.toString(),
        nickname: user.nickname,
        email: user.email
      });
    });
  });
}
