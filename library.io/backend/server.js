const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
let dbConnect = require('./dbConnect');

var corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

// parse requests of content-type - application / json;
app.use(express.json());

let userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my MYSQL application.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on
port ${PORT}.`);
});
