import express from "express";
import auth from "./routes/auth.js";
import { connectToMongoDB } from "./db.js";

await connectToMongoDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

const PORT = 3000;

const accountSettings = {
  id: 1,
  name: "jane doe",
  number_of_pets: 0,
  inventory: {},
};

app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/home", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/account", (req, res) => {
  res.render("account", { title: "Account", accountSettings });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
