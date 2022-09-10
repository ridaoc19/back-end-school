const passport = require("passport");
const { idUserInfo } = require("../../modules/users/users.functions");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const Users = require("../../modules/users/users.models");

passport.use(
  "auth-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google",
    },

    function (request, accessToken, refreshToken, profile, done) {
      Users.findOne({ where: { email: profile._json.email } })
        .then((email) => {
          done(null, email);
        })
        .catch((error) => done(error));
    }
  )
);

let google = passport.authenticate("auth-google", { scope: [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
],
session: false,
})
module.exports = google;