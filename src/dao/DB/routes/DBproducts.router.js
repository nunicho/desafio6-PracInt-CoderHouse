const Router = require("express").Router;
const router = Router();
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");

// CONECCION A MONGODB

const productosModelo = require("../models/productos.modelo.js");

//------------------------------------------------------------------------ PETICION GET

router.get("/", async (req, res) => {
  let productosDB = await productosModelo.find();

  //const limit = parseInt(req.query.limit) || productosDB.length;
  //const limitedData = productosDB.slice(0, limit);
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ productosDB });
});

//------------------------------------------------------------------------ PETICION GET con /:ID

router.get("/:id", (req, res) => {
  let productos = getProducts();

  let pid = req.params.id;
  pid = parseInt(pid);
  if (isNaN(pid)) {
    res.json({
      status: "error",
      mensaje: "Require un argumento id de tipo numerico",
    });
    return;
  }
  let resultado = productos.filter((producto) => producto.id === pid);

  if (resultado.length > 0) {
    res.status(200).json({ data: resultado });
  } else {
    res
      .status(404)
      .json({ status: "error", mensaje: `El id ${pid} no existe` });
  }
});

//------------------------------------------------------------------------ PETICION POST

router.post("/", async (req, res) => {
  let producto = req.body;
  if (
    !producto.title ||
    !producto.description ||
    !producto.price ||
    !producto.thumbnail ||
    !producto.code ||
    !producto.stock
  )
    return res.status(400).json({ error: "Faltan datos" });

  let existe = await productosModelo.findOne({ code: producto.code });
  if (existe)
    return res
      .status(400)
      .json({
        error: `El código ${producto.code} ya está siendo usado por otro producto.`,
      });

  try {
    let productoInsertado = await productosModelo.create(producto);
    res.status(201).json({ productoInsertado });
  } catch (error) {
    res.status(500).json({ error: "Error inesperado", detalle: error.message });
  }
});

//------------------------------------------------------------------------ PETICION PUT

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "id inválido" });

  let modifica = req.body;

  if (
    !modifica.title ||
    !modifica.description ||
    !modifica.price ||
    !modifica.thumbnail ||
    !modifica.code ||
    !modifica.stock
  )
    return res.status(400).json({ error: "Faltan datos" });

  let validaCode = await productosModelo.findOne({
    code: modifica.code,
    _id: { $ne: id },
  });
  if (validaCode)
    return res
      .status(400)
      .json({ error: `Ya existe otro producto con code ${modifica.code}` });

  let existe = await productosModelo.findById(id);
  console.log(existe);

  if (!existe)
    return res.status(404).json({ error: `Producto con id ${id} inexistente` });
  let resultado = await productosModelo.updateOne({ _id: id }, modifica);

  console.log(resultado);

  res.status(200).json({ resultado });  
});

//------------------------------------------------------------------------ PETICION DELETE

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "id inválido" });


  let existe = await productosModelo.findById(id);

  if (!existe)
    return res.status(404).json({ error: `Producto con id ${id} inexistente` });
  let resultado = await productosModelo.deleteOne({ _id: id });

  res.status(200).json({ resultado });  
});

module.exports = router;
