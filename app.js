require('dotenv').config({
    path: './config/.env'
})
const { PORT } = process.env;
const express = require('express');
const CORS = require('cors');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const elasticClinet = require('./config/config.elastic').indices

app.use(express.static(__dirname + '/public')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(expressEjsLayouts)
// app.use(express)
app.set('view engine', 'ejs')
app.set('views', 'views')
app.set('layout', './layouts/master')

app.use('/', require('./routes/mainroutes.routes'))
app.use('/indices', require('./routes/indices.routes'))
app.use(CORS);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: 'fail' ,
        message : error.message || 'Internal Server Erorr'
    })
    console.log(error);
})

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
})