require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const heartRateRoute = require('./routes/heart-rate.routes');

// Initialize Express app
const app = express();

//Payload size
app.use(express.json({limit: '5mb'}));

// Body parser middleware
app.use(bodyParser.json());
app.use('/api', heartRateRoute);

process.on('uncaughtException', (err) => {
    console.log('Internal Server Error');
 });
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));