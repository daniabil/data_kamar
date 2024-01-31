const express = require('express');
const cors = require('cors')

const dataKamar = require('./datas/dataKamar')

const app = express();
const port = 3000;

app.use(cors())

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
            data : dataKamar.executive
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

app.listen(port, () => {
    console.log(`Server jalan di Port ${port}`)
});
