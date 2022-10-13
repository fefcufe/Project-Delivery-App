const express = require('express');
const cors = require('cors');
const loginRoute = require('../routes/loginRoute');
const productRoute = require('../routes/productRoute');
const userRoute = require('../routes/userRoute');
const saleRoute = require('../routes/saleRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/images', express.static('public'));
app.use(loginRoute);
app.use(productRoute);
app.use(userRoute);
app.use(saleRoute);

module.exports = app;
