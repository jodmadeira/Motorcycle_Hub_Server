// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);

const cardsRoutes = require("./routes/cards.routes");
app.use("/api", cardsRoutes);

const motorcycleRoutes = require("./routes/motorcycle.routes");
app.use("/api", motorcycleRoutes);

const userMotorcycleRoutes = require("./routes/userMotorcycles.routes");
app.use("/api", userMotorcycleRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
