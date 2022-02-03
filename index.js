const express = require("express");

const methodOverride = require("method-override");
const path = require("path");
const app = express();
const port = 3000;

const route = require("./src/routers");
const db = require("./src/config/db");
const SortMiddleWare = require("./src/app/middlewares/SortMiddleWare");
const helpersHandlebars = require("./src/helpers/handlebars");
// Connect to DB
db.connect();

const hbs = require("express-handlebars").create({
  defaultLayout: "main",
  extname: ".hbs",
  partialsDir: [path.join(__dirname, "src/resources/views/partials/")],
  helpers: helpersHandlebars,
});
app.use(express.static(path.join(__dirname, "src/public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));
app.use(SortMiddleWare);

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/resources/views"));

route(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  console.log(err);
  err.status = 404;
  res.send("Route not found");
  next(err);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
