const express = require("express");
const router = express.Router();

// return console.log("\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n"
// );

// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express Authentication" });
// });

router.get("/", (req, res) => {
  res.render("index", {title: "yoo"});
});

// router.get("/", (req, res) => {
//   res.render("index", {title:"yo"});
// });

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;
