const express = require('express');
const cors = require('cors');
const dataKamar = require('./datas/dataKamar');
const {Pool} = require("pg");
require("dotenv").config(); 

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

let {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
        require: true,
    },
});

pool.connect((err) => {
    if(err) throw err
    console.log("Database Connected")
})

app.post('/pelanggan', async (req, res) => {
    try {
        const { name, address, email, phone_number, in_date, out_date, type } = req.body;
        const newCustomer = await pool.query(
            'INSERT INTO pelanggan (name, address, email, phone_number, in_date, out_date, type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, address, email, phone_number, in_date, out_date, type]
        );
        res.json(newCustomer.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


app.get('/',(req, res) => {
    res.status(200).send('GENERATE DATA KAMAR . /kamar/: /deluxe, /suite, /superior, /standar')
})


app.get('/kamar/:nama', (req,res) => {
    const nama = req.params.nama;
    if (nama === 'deluxe'){
        res.json({
            name : 'Deluxe',
            data : dataKamar.deluxe
        })
    }else if (nama === 'suite') {
        res.json({
            name : 'Suite',
            data : dataKamar.suite
        })
    }else if(nama === 'superior') {
        res.json({
            name : 'Superior',
            data : dataKamar.superior
        })
    }else if(nama === 'standar') {
        res.json({
            name : 'Standar',
            data : dataKamar.standar
        })
    }
}) 

app.listen(port,()=>{
    console.log(port)
})