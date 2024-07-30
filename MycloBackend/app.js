const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const productRoutes = require('./src/Routes/productRoutes');
const orderRoutes = require('./src/Routes/orderRoutes');
const designRoutes = require('./src/Routes/designRoutes');
const fabricRoutes = require('./src/Routes/fabricRoutes');
const categoryRoutes = require('./src/Routes/categoryRoutes');
const authRoute = require('./src/Routes/authRoute');
const profileRoutes = require("./src/Routes/profileRoutes");


const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Use routes

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/fabrics', fabricRoutes);
app.use('/api/categories', categoryRoutes);

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use('/api/profile', profileRoutes);

app.use('/api/auth', authRoute);






// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
