import express from "express";
import mysql from 'mysql';
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
  }));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login'
})

const app = new express();

app.get('/', (req, res) => {

    con.query('SELECT * FROM login', (erro, result) => {
        res.send(result);
    })

});

app.listen('3030', () => {
    console.log('Running server');
});