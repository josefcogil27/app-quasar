const express = require('express');
const { QueryTypes } = require('sequelize');
const app = express();
const db = require('../db_connect');

app.get('/products', (req, res) => {
    let sql = "SELECT id, nom_inv, can_inv FROM inventario";

    db.query(sql, { type: QueryTypes.SELECT })
        .then(products => res.json({products}))
        .catch(err => res.json({err}));
});

app.get('/categories', (req, res) => {
    let sql = "SELECT categoria, id FROM categorias";

    db.query(sql, { type: QueryTypes.SELECT })
        .then(categories => res.json({categories}))
        .catch(err => res.json({err}));
});

app.get('/products/:id', (req, res) => {
    let id = req.params.id;
    let sql = `SELECT id, nom_inv, can_inv FROM inventario WHERE id_categoria = ${id}`;
    
    db.query(sql, { type: QueryTypes.SELECT })
        .then(products => res.json({products}))
        .catch(err => res.json({err}));
});

app.get('/products/search/:id', (req, res) => {
    let id = req.params.id;
    let sql = `SELECT id, nom_inv, can_inv FROM inventario WHERE nom_inv LIKE '%${id}%'`;
    
    db.query(sql, { type: QueryTypes.SELECT })
        .then(products => res.json({products}))
        .catch(err => res.json({err}));
});

app.get('/products/info/:id', (req, res) => {
    let id = req.params.id;
    let sql = `SELECT nom_inv, des_inv, can_inv, fec_reg_inv, pre_inv, pre_ven_inv, fec_reg_inv, categorias.categoria, ivas.descripcion, ivas.porcentaje FROM inventario INNER JOIN categorias ON categorias.id = inventario.id_categoria INNER JOIN ivas ON ivas.id = inventario.id_iva WHERE inventario.id = ${id}`;
    
    db.query(sql, { type: QueryTypes.SELECT })
        .then(products => res.json({products}))
        .catch(err => res.json({err}));
});


module.exports = app;