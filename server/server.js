const express = require("express");
const app = require("../app");
const routes = require("./routes");

const port = process.env.PORT || 8080;

// Configuration
// ================================================================================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// API routes
app.use("", routes);

app.listen(port, "0.0.0.0", err => {
  if (err) {
    console.log(err);
  }

  console.info("app running in port-", port);
});

module.exports = app;
