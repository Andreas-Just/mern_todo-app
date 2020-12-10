const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  baseUrl: process.env.BASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI,
};
