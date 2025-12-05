
require('dotenv').config({ path: './db.env' }); // loads MONGO_URI, PORT
const cors = require("cors");
const express = require('express');
const connectDB = require('./config');            // your config.js
const bookroutes = require('./models/bookroutes'); // router file (create if missing)
const errorHandler = require('./models/errorHandler'); // create below

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"  // or "*" if you want to allow any origin (less secure)
}));

// connect DB (you can await if you want server to start after DB)
connectDB();

// mount routes
app.use('/books', bookroutes);

// basic health
app.get('/', (req, res) => res.send('Server running'));

// central error handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));