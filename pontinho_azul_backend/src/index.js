const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./UserController'); // Change the file name to 'userController.js'

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('YOUR_MONGODB_ATLAS_CONNECTION_STRING', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
