const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static('public'))













// مسر
app.get("/", (req, res) => {
  console.log("--------------------------------------------------")
  User.find().then((result) => {
    res.render("index", {arr: result});
  }).catch((err) => {
    console.log(err)
  })


  
});










app.get("/user/add.html", (req, res) => {
  res.render("user/add");

});


app.get("/user/view.html", (req, res) => {
  res.render("user/view");

});

app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");

});

app.get("404.html", (req, res) => {
  res.render("404");

});



// post requst

app.post("/user/add.html", (req, res) => {

  const user = new User(req.body);
  user.save().then(() => {
    res.redirect("/")
  }).catch((err) => {
    console.log(err);
    res.redirect("/views/404.ejs")
  })


  res.redirect("/user/add.html")
});








// DB
mongoose
  .connect(
    "mongodb+srv://medo:gQHz3p0lmgWUiahq@lop.vzrhpjh.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`linck: http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });





// Auto refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});