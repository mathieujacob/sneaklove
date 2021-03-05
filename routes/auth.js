const express = require("express");
const router = new express.Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");


  router.get("/signin", (req, res) => {
    res.render("signin");
  });

  router.post("/signin", async (req, res, next) => {
    console.log("je suis dans le post");
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
  
    if (!foundUser) {
        console.log("je ne trouve pas de user");
      req.flash("error", "Invalid credentials");
      res.redirect("/signin");
    } else {
        console.log("j'ai trouvé");
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        req.flash("error", "Invalid credentials");
        res.redirect("/signin");
      } else {
        const userObject = foundUser.toObject();
        delete userObject.password; 
        req.session.currentUser = userObject; 
        req.flash("success", "Successfully logged in...");
        res.redirect("/");
      }
    }
  });

  // router.get("/signup", (req, res) => {
  //   res.render("signup");
  // });
  
  
router.get("/signup", async (req, res, next) => {
    console.log("je suis dans le get signup");
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  
  try {
    const newUser = { ...req.body };
    const foundUser = await User.findOne({ email: newUser.email });
    
    if (foundUser) {
      
      req.flash("warning", "Email already registered");
      res.redirect("/signin");
    } else {
      // const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      // newUser.password = hashedPassword;
     
      await User.create(newUser);
      console.log("deja redirect");
      req.flash("success", "Congrats ! You are now registered !");
      res.redirect("/");
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
      res.redirect("/signin");
    });
  });
  
  module.exports = router;
  
