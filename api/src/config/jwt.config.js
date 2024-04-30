const jwt = require("jsonwebtoken");
require("dotenv").config();
const getToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.TOKEN,
    { expiresIn: "1h" }
  );
};

const getTokenData = (token) => {
  let data = null;
  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) {
      console.log("Error al obtener data del token");
    } else {
      data = decoded;
    }
  });

  return data;
};

module.exports = {
  getToken,
  getTokenData,
};
