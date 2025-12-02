const express= require("express");
const app=express();
// const mongoose =require("mongoose");
const path= require("path");
const methodOverride=require("method-override");
// const ejsMate=require("ejs-mate");



// const MONGO_URL=("mongodb://127.0.0.1:27017/database");

// main().
// then(()=>{
//     console.log("connected  to database");
// })
// .catch((err) =>{
//    console.log(err);
// });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
// app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));




app.get("/", (req, res) => {
    return res.redirect("/user-selection");
});

   //User Selection Page
app.get("/user-selection", (req, res) => {
  res.render("listings/userSelection"); 
});

app.post("/user-selection", (req, res) => {
  const { email, password } = req.body;

  // if (email === "hardik1234@gmail.com" && password === "1234") {
    res.redirect("/cafeSelection");
  // } else {
    // res.send("Invalid Credential !! <a href='/user-selection'>Try again</a>");
  // }
});



//cafe selection route
app.get("/cafeSelection", (req, res) => {
  res.render("listings/cafeSelection");
});
//home page route
// About page route
app.get("/about", (req, res) => {
  res.render("listings/about");
});
//help page route
app.get("/help", (req, res) => {
  res.render("listings/help");
});






// Menu page route
app.post("/menu", (req, res) => {
  const { district, pincode, college, cafe } = req.body;

  
  res.render("listings/menu");
});
// Order page route
app.get("/order", (req, res) => {
  res.render("listings/order");
});
// Settings page route
app.get("/settings", (req, res) => {
  res.render("setting");
});
// profile page route
app.get("/profile", (req, res) => {
  res.render("listings/profile");
});



// staff routes
// app.get("/staff-dashoard", (req, res) => {
//   res.render("listings/student"); 
// });


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
