const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const tourRoute = require('./routes/v1/tour.route');

// Query
app.use('/api/v1/tour', tourRoute);

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

app.all("*", (req, res) => {
    res.send("NO route found.");
});


module.exports = app;


// SCHEMA --> MODEL --> QUERY