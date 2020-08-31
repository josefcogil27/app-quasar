const express = require('express');
const cors = require('cors/lib/index');
const { server_puerto } = require('./config');

const app = express();
app.use(cors());

app.use(require('./routes/products'));

app.listen(server_puerto, err => {
    if(err) {
        throw new error;
    } else {
        console.log(`Servidor Abierto en el Puerto ${server_puerto}`);
    }
})

module.exports = app;