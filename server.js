require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOption');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');

// connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// handle options credentials and CORS
app.use(credentials);
app.use(cors(corsOptions));

// handle url encoded data, form data
app.use(express.urlencoded({ extended: false }));

// handle json
app.use(express.json());

//handle static file such as .css
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/auth'));


//catch all other pages and redirect to error
app.all('*', (req, res) => {
    res.status(404);

    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 NOT FOUND" });
    } else {
        res.type('txt').send('404 NOT FOUND');
    }
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    })
})