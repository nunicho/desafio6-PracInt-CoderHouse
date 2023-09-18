const mongoose = require("mongoose");

const productosColeccion = 'productos'
const productosEsquema = new mongoose.Schema({
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail:{
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  }
});

const productosModelo = mongoose.model(productosColeccion, productosEsquema);

module.exports = productosModelo