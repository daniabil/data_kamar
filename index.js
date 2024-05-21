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


app.get('/',(req, res) => {
    res.status(200).send('GENERATE DATA KAMAR . /kamar/: /deluxe, /suite, /superior, /standar')
})

app.post("/books", async (req, res) => {
    const { name, author, year } = req.body;
    console.log("BODY:::", req.body);
  
    async function addNewBook(name, author, year) {
      const client = await pool.connect();
      try {
        const insertQuery = `INSERT INTO books (name, author, year) VALUES ($1, $2, $3)`;
        const values = [name, author, year];
        await client.query(insertQuery, values);
      } finally {
        client.release();
      }
    }
  
    addNewBook(name, author, year)
      .then((data) => res.send({ message: "Book added succesfully" }))
      .catch((err) => console.log(err));
  });

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

// app.listen(port, () => {
//     console.log(`Server jalan di Port ${port}`)
// });
