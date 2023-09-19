const mongoose = require("mongoose");

// Define el esquema para los productos dentro del carrito
const productoCarritoSchema = new mongoose.Schema({
  id: String,
  quantity: Number,
},
{ _id: false });

// Define el esquema para el carrito que contiene productos
const carritoSchema = new mongoose.Schema({
  products: [productoCarritoSchema], // Los productos van dentro del carrito como un arreglo de subdocumentos
});

const carritoModelo = mongoose.model("Carrito", carritoSchema);

module.exports = carritoModelo;

