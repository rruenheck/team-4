import express from "express";

const app = express();
app.use(express.json())

app.set("view engine", "ejs");
app.set("views", "views");

const PORT = 3000;


const accountSettings = {
      "id" : 1,
      "name" : "jane doe",
      "number_of_pets" : 0,
      "inventory" : {},
    }

app.get('/account',(req,res)=>{
  res.render("account", { title: "Account Page", accountSettings});
})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
