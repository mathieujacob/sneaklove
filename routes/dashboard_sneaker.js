const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const SneakerModel = require("../models/Sneaker");
const TagModel = require("../models/Tag");
const User = require("../models/User");

//Get - render sneaker
router.get("/sneakers/collection", (req, res, next) => {
    console.log(" ------je suis dans collection-------");
   SneakerModel.find()
    .then((dbres) => {
        res.render("products_manage", {Sneaker: dbres});
    })
    .catch((error)=>{
        next(error)
    })
  });

//POST - create a sneaker
  router.post("/sneakers/collection", async (req, res, next) => {
    const {name,ref,size,description,price,category, id_tags} = req.body;
    console.log(req.body);
    try {
      await SneakerModel.create( {
        name,
        ref,
        size,
        description,
        price,
        category,
        id_tags,
      });
      res.redirect("products_add");
      
    } catch (err){
        res.redirect("products");
      next(err);
    }
  });

  // GET - delete one sneaker
router.get("/sneakers/delete/:id", async (req, res, next) => {
    try {
       
      await SneakerModel.findByIdAndRemove(req.params.id);
      res.redirect("/products_manage");
    } catch (err) {
      next(err);
    }
  });
//POST - fin a sneaker to update
  router.get('/sneakers/edit/:id', (req, res, next) => {
    console.log("----je suis dans edit -----");
    SneakerModel.findById(req.params.id).then((sneaker) => {
        console.log(sneaker)  
        res.render("product_edit", { sneaker })})
      .catch(next);
    });
//POST - update a sneaker
  router.post('/sneakers/edit/:id', async (req, res, next) => {
    const {name,ref,size,description,price,category, id_tags} = req.body;
    console.log("yo");
    try {
      await SneakerModel.findByIdAndUpdate(req.params.id, {
        name,
        ref,
        size,
        description,
        price,
        category,
        id_tags,
      });
      res.redirect("products");
    } catch (err) {
      next(err);
    }
  });

  module.exports = router;
