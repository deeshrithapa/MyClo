require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoute = require('./src/Routes/authRoute');
const profileRoutes = require('./src/Routes/profileRoutes');
const cartRoutes = require('./src/Routes/cartRoutes');
const cartItemRoutes = require('./src/Routes/cartItemRoutes');
const categoryRoutes = require('./src/Routes/categoryRoutes');
const colorRoutes = require('./src/Routes/colorRoutes');
const designRoutes = require('./src/Routes/designRoutes');
const fabricRoutes = require('./src/Routes/fabricRoutes');
const itemRoutes = require('./src/Routes/itemRoutes');
const measurementRoutes = require('./src/Routes/measurementRoutes');
const orderRoutes = require('./src/Routes/orderRoutes');
const orderItemRoutes = require('./src/Routes/orderItemRoutes');
const paymentRoutes = require('./src/Routes/paymentRoutes');
const productRoutes = require('./src/Routes/productRoutes');
const reviewRoutes = require('./src/Routes/reviewRoutes');
const sizeRoutes = require('./src/Routes/sizeRoutes');
const customizationRoutes = require('./src/Routes/customizationRoutes');


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
app.use('/api/cartitem', cartItemRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/color', colorRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/fabrics', fabricRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/measurements', measurementRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderitems', orderItemRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/customize', customizationRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
