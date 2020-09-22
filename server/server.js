const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}).catch((error) => {
    console.log('error!!!');
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established succesfully');
});

const usersRouter = require('./routes/users');
const checkoutRouter = require('./routes/checkout');
const calendarRouter = require('./routes/calendar');


app.use('/users', usersRouter);
app.use('/checkout', checkoutRouter);
app.use('/calendar', calendarRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});