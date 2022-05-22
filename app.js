const express = require("express");
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const routes = require("./server/routes");

const app = express();
const create = handlebars.create;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const hbs = create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views", "partials"),
  extname: ".hbs"
});
app.engine(".hbs", hbs.engine);
const Handlebars = require("handlebars");

Handlebars.registerHelper("ifCond", function conditionals(
  v1,
  operator,
  v2,
  options
) {
  switch (operator) {
    case "==":
      // eslint-disable-next-line eqeqeq
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      // eslint-disable-next-line eqeqeq
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));
// use bootstrap
let pathtinymce = require.resolve("tinymce");
pathtinymce = path.join(pathtinymce, "..");
app.use("/tinymce", express.static(pathtinymce));
// use bootstrap
let pathbootstrap = require.resolve("bootstrap");
pathbootstrap = path.join(pathbootstrap, "..", "..", "..");
app.use("/bootstrap", express.static(pathbootstrap));
// use quill
let pathquill = require.resolve("quill");
pathquill = path.join(pathquill, "..");
app.use("/quill", express.static(pathquill));

app.use("", routes);

module.exports = app;
