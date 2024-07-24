// const express = require('express');
// const app = express();
// const connectDB = require("./src/Config/db");
// app.use(express.json());
// const port = 3000;

// //used to connect to database
// connectDB();



// app.listen(port, ()=>{
//     console.log(`server is running on ${port}`)
// })

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/Routes/userRoutes');
const productRoutes = require('./src/Routes/productRoutes');
const orderRoutes = require('./src/Routes/orderRoutes');
const designRoutes = require('./src/Routes/designRoutes');
const fabricRoutes = require('./src/Routes/fabricRoutes');
const categoryRoutes = require('./src/Routes/categoryRoutes');

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('your-mongodb-connection-string', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/fabrics', fabricRoutes);
app.use('/api/categories', categoryRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
