const express = require('express');
const cors = require('cors')

const dataKamar = require('./datas/dataKamar')

const app = express();
const port = 3000;

app.use(cors())

app.use((req, res) => {
    console.log('tes')
    res.status(404).send("404: Page not found");
});

app.get('/',(req, res) => {
    res.status(200).send('GENERATE DATA KAMAR : /deluxe, /executive, /superior, /standar')
})


app.get('/kamar/:nama', (req,res) => {
    const nama = req.params.nama;
    if (nama === 'deluxe'){
        res.json({
            name : 'Deluxe',
            data : dataKamar.deluxe
        })
    }else if (nama === 'executive') {
        res.json({
            name : 'Executive',
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
    }else {
        res.status(404).send('Server ERROR');
    }
}) 

app.listen(port, () => {
    console.log(`Server jalan di Port ${port}`)
});
