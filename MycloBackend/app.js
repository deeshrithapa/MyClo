require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoute = require('./src/Routes/authRoute');
const profileRoutes = require('./src/Routes/profileRoutes');
const cartRoutes = require('./src/Routes/cartRoutes');
const categoryRoutes = require('./src/Routes/categoryRoutes');
const orderRoutes = require('./src/Routes/orderRoutes');
const productRoutes = require('./src/Routes/productRoutes');
const customizationRoutes = require('./src/Routes/customizationRoutes');
const contactRoutes = require('./src/Routes/contactRoutes');



// Import the DB connection function
const connectDB = require('./src/Config/db');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true
}));

// Connect to the database
connectDB();

// Use routes
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoute);
app.use('/api/cart', cartRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customize', customizationRoutes);
app.use('/api/contact', contactRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
