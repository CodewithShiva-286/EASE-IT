
const express = require('express');

const app = express();
const userRoute = require("./src/routes/userRoute");
const db = require('./src/config/db');
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use("/api",userRoute);


db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
