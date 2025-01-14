const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ username });
      if (!user) {
        return done(null, false, { message: "incorrect username" });
      }

      const ispassword = user.password == password ? true : false;
      if (ispassword) {
        return done(null, user);
      } else {
        return done(null, false, { meassage: "incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
