const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const eventsRoutes = require("./routes/events");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect("mongodb+srv://lukegrech:8Sbu0ZBSPu4sEErW@mean-event-app-db.eaitb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to Database');
})
.catch(() => {
    console.log('Database Connection Failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/events", eventsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
