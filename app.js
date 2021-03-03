const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

var http = require('http');
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(morgan('dev'))
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.send('Funcionando el servidor')
})

// Variables iniciales....
let total = 0

// Vamos a recibir los valores de la pagina Web y respondemos con un Json.

app.post('/calculo', function(req, res, next) {

    console.log(req.body.cantidad)
    console.log(req.body.producto)
    console.log(req.body.precio)
    console.log(req.body.categoria)


    let cantidad = parseInt(req.body.cantidad)
    let producto = req.body.producto
    let precio = parseInt(req.body.precio)
    let categoria = req.body.categoria
    let json_devuelto


    if (req.body.categoria.trim() == 'favorito') {
        console.log('favorito')

    } else {
        console.log('carrito')



        total = total + (precio * cantidad)
    }

    console.log(total)

    json_devuelto = {
        'cantidad': `${cantidad}`,
        'producto': `${producto}`,
        'precio': `${precio}`,
        'categoria': `${categoria}`,
        'total': `${total}`
    }
    res.status(200).json(json_devuelto)
})



app.listen(3000, '0.0.0.0', function() {
    console.log('Funcionnado en puerto 3000')
})