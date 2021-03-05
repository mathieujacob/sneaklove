const express = require("express");
const router = new express.Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");


router.get("/signin", (req, res, next) => {
    console.log("je suis sur signin");
    res.render("/signin");
  });


  router.post("/signin", async (req, res, next) => {
    // DO something
    console.log("je suis dans le post");
    //   res.render("auth/signin.hbs");
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
  
    if (!foundUser) {
        console.log("je ne trouve pas de user");
      //   Display an error message telling the user that either the password
      // or the email is wrong
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
      // res.render("auth/signin.hbs", { error: "Invalid credentials" });
    } else {
        console.log("j'ai trouvé");
      // https://www.youtube.com/watch?v=O6cmuiTBZVs
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        // Display an error message telling the user that either the password
        // or the email is wrong
        req.flash("error", "Invalid credentials");
        res.redirect("/signin");
        // res.render("auth/signin.hbs", { error: "Invalid credentials" });
      } else {
        // everything is fine so :
        // Authenticate the user...
        const userObject = foundUser.toObject();
        delete userObject.password; // remove password before saving user in session
        // console.log(req.session, "before defining current user");
        req.session.currentUser = userObject; // Stores the user in the session (data server side + a cookie is sent client side)
  
        // https://www.youtube.com/watch?v=nvaE_HCMimQ
        // https://www.youtube.com/watch?v=OFRjZtYs3wY
  
        req.flash("success", "Successfully logged in...");
        res.redirect("/");
      }
    }
  });


router.get("/signup", async (req, res, next) => {
  res.render("/signup");
  console.log("je suis dans le get signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = { ...req.body };
    const foundUser = await User.findOne({ email: newUser.email });

    if (foundUser) {
        console.log("deja redirect");
      req.flash("warning", "Email already registered");
      res.redirect("/signup");
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      newUser.password = hashedPassword;
      await User.create(newUser);
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/signin");
    }
  } catch (err) {
    let errorMessage = "";
    for (field in err.errors) {
      errorMessage += err.errors[field].message + "\n";
    }
    req.flash("error", errorMessage);
    res.redirect("/signup");
  }
});

router.get("/signout", async (req, res, next) => {
    req.session.destroy(function (err) {
      // cannot access session here anymore
      // console.log(req.session.currentUser);
      res.redirect("/signin");
    });
  });
  
  module.exports = router;
  















module.exports = router;