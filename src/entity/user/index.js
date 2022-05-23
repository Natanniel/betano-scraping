require('dotenv/config');

const user = {
  email: process.env.USEREMAIL,
  password: process.env.PASSWORD
}

module.exports = user;