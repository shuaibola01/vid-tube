// ORIGINAL
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const baseRouter = require('./routes');
// const morgan = require('morgan');
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"))

// // Connect DB
// connectDB();

// app.get("/", (req,res) => {
//     res.json("Welcome to movie app web service...")
// })

// // Routes
// app.use("/api",baseRouter);

// module.exports = app;




require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const baseRouter = require('./routes');
const morgan = require('morgan');
const app = express();


const allowedOrigins = [
  process.env.APP_URL,
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.json("Welcome to movie app web service...");
});

// Routes
app.use("/api", baseRouter);

module.exports = app;







// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const baseRouter = require("./routes");
// const morgan = require("morgan");

// const app = express();

// // ✅ Safer CORS Configuration using a function
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://vic-movies.vercel.app",
//   "https://vic-movies-git-frontend-victor-asiyas-projects.vercel.app",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS not allowed"));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// // ✅ Middleware
// app.use(express.json());
// app.use(morgan("dev"));

// // ✅ Connect DB
// connectDB();

// // ✅ Test Route
// app.get("/", (req, res) => {
//   res.json("Welcome to movie app web service...");
// });

// // ✅ Routes
// app.use("/api", baseRouter);

// module.exports = app;
