import express from "express";
import auth from "./routes/auth.js";
import accountRoutes from "./routes/account.js";
import session from "express-session";
import { connectToMongoDB } from "./db.js";

await connectToMongoDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60, // One hour
    },
  }),
);

app.use(auth);
app.use(accountRoutes);

app.set("view engine", "ejs");
app.set("views", "views");

const PORT = 3000;

app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/home", (req, res) => {
  res.render("home", { title: "Home" });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  const status = err.status || 500;
  const message = status >= 500 ? "Internal server error" : err.message;
  return res.status(status).json({
    error: message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
