const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB error:', err));


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false
}));

// Routes
const indexRoutes = require("./routes/index");
app.use('/', indexRoutes);

app.listen(8000, () => {
  console.log('Server started on http://localhost:8000');
});
