require('dotenv').config({
    path: './config/.env'
})
const { PORT } = process.env;
const express = require('express');
const CORS = require('cors');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(expressEjsLayouts)
// app.use(express)
app.set('view engine', 'ejs')
app.set('views', 'views')
app.set('layout', './layouts/master')

app.use('/', require('./routes/mainroutes.routes'))
app.use(CORS);

app.use((error, req, res, next) => {
    console.log(error);
})

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
})