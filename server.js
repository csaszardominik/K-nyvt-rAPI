require('dotenv').config();
const express = require('express');
const cors = require('cors');

const booksroutes = require('./routes/books.routes');
const loansroutes = require('./routes/loans.routes');
const readersroutes = require('./routes/readers.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Library API');
});

app.use('/api/books', booksroutes);
app.use('/api/loans', loansroutes);
app.use('/api/readers', readersroutes);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running op port http://localhost:${process.env.APP_PORT}`);
});
