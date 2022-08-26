require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL
  },
}