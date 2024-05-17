const mongoose = require("mongoose");

// Define the MongoDB connection URL with the database name
const mongoURL = 'mongodb://127.0.0.1:27017/Hotel'; // Replace 'mydatabase' with your actual database name

// Set up MongoDB connection
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

db.on('connected', () => {
  console.log("Connected to the MongoDB server");
});

db.on('error', (err) => {
  console.log("MongoDB connection error:", err);
});

db.on('disconnected', () => {
  console.log("MongoDB server disconnected");
});

module.exports = db;
