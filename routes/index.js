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

// router.get("/signin", (req, res, next) => {
//   console.log("je suis sur signin");
//   res.render("/signin");
//   console.log("je suis sur signin 2");
// });


router.get("/", (req, res) => {
  res.render("index", {title: "yoo"});
});

// router.get("/", (req, res) => {
//   res.render("index", {title:"yo"});
// });

router.get("/sneakers/:id", (req, res) => {
  res.render("products");
});

router.get("/one-product/:id", (req, res) => {
  res.send("one_product");
});

module.exports = router;
