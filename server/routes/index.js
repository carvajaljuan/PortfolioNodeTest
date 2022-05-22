const asyncHandler = require("express-async-handler");
const express = require("express");
const Portfolio = require("../controllers/portfolio.controller");

const Router = express.Router;
const router = new Router();

router.get("/getportfolio", asyncHandler(Portfolio.getData));

router.post("/updateportfolio", asyncHandler(Portfolio.updateData));

router.get("*", (req, res) => {
  res.render("404", {
    nombre: "Portfolio-user",
    titulo: "404",
    layout: "layoutblank"
  });
});

module.exports = router;
