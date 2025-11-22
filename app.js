require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const mainRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected MongoDB!'))
  .catch(err => console.error('Error connect MongoDB! ', err));

app.use('/', mainRoutes); 

app.listen(PORT, () => {
  console.log(`Sever running on http://localhost:${PORT}`);
});