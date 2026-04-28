require('dotenv').config();
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

//no cache
app.use("/css", (req, res, next) => {
  console.log("CSS hit:", req.url);
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/js", (req, res, next) => {
  console.log("JS hit:", req.url);
  res.set("Cache-Control", "no-store");
  next();
});

app.use(express.static('public', {
  etag: false,
  lastModified: false,
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-store');
  }
}));



app.get("/", (req, res) => {
    return res.redirect("/user-selection");
});

   //User Selection Page
app.get("/user-selection", (req, res) => {
  res.render("listings/userSelection"); 
});

app.post("/user-selection", (req, res) => {
  const { role } = req.body;

  if (role === "staff") {
    return res.redirect("/staff/campus");
  } else {
    return res.redirect("/cafeSelection");
  }
});

app.get("/login", (req, res) => {
  res.render("listings/login");
});

app.get("/staff/login", (req, res) => {
  res.render("staff/staffLogin");
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

app.get("/staff/campus", (req, res) => {
  const campuses = [
    { _id: 1, name: "DBUU" },
    { _id: 2, name: "North Campus" }
  ];

  res.render("staff/campusSelection", { campuses });
});

app.get("/staff/get-canteens/:id", (req, res) => {
  const campusId = req.params.id;

  if (campusId == "1") {
    return res.json([
      { _id: 101, name: "BBC Cafeteria" },
      { _id: 102, name: "Main Block Cafe" }
    ]);
  }

  res.json([]);
});

app.post("/staff/create-canteen", (req, res) => {
  const { canteenName, description, openTime, closeTime, location, contact } = req.body;

  console.log("Canteen Details:", req.body);

  res.redirect("/staff/add-menu");
});

app.get("/staff/add-menu", (req, res) => {
  res.render("staff/addMenu");
});



app.get("/staff/search-images", async (req, res) => {
  const query = req.query.q;
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=9&orientation=landscape`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
    }
  });
  const data = await response.json();
  res.json(data.results.map(img => ({
    url: img.urls.small,
    alt: img.alt_description
  })));
});

app.get("/staff/dashboard", (req, res) => {
  res.render("staff/dashboard");
});