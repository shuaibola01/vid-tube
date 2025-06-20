require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// import adminRoutes from "./routes/adminRoutes.js";

// app.use("/api/admin", adminRoutes);


dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
    console.log('Mongo URI:', process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });



  