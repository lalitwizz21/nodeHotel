const passport = require("passport");
const Person = require("./models/Person");
const LocalStrategy = require("passport-local").Strategy;

// created a local username and password authentication.
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("username, password", username, password);
      const person = await Person.findOne({ username: username });
      console.log("person", person);

      if (!person) {
        return done(null, false, { message: "Person not found" });
      }

      const isPassword = await person.comparePassword(password);
      if (!isPassword) {
        return done(null, false, { message: "Wrong password." });
      }

      return done(null, person);
    } catch (error) {
      done(error);
    }
  })
);

module.exports = passport;
