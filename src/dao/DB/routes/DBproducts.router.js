const Router = require("express").Router;
const router = Router();
const path = require("path");
const fs = require("fs");

// CONECCION A MONGODB

const productosModelo = require("../models/productos.modelo.js");

//------------------------------------------------------------------------ PETICION GET

router.get("/", async(req, res) => {
 
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
  !producto.stock)
  return res.status(400).json({ error: "Faltan datos" });
  
  let existe = await productosModelo.findOne({code:producto.code})
  if(existe) return res.status(400).json({ error: `El código ${producto.code} ya está siendo usado por otro producto.` });

  try {
    let productoInsertado = await productosModelo.create(producto)
    res.status(201).json({productoInsertado})

  } catch (error) {
    res.status(500).json({ error: "Error inesperado", detalle: error.message });

  }


/*
  if (productos.some((producto) => producto.code === code)) {
    return res
      .status(400)
      .json({ error: `El CODE ${code} ya está siendo usado` });
  }

  if (title && description && price && thumbnail && code && stock) {
    const nuevoProducto = {
      id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
      status: true, //por defecto se debe seleccionar TRUE.
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    productos.push(nuevoProducto);

    try {
      await fs.promises.writeFile(
        ruta,
        JSON.stringify(productos, null, 5),
        "utf8"
      );
      res.status(201).json({ nuevoProducto });
    } catch (error) {
      console.error("Error al escribir en el archivo:", error);
      res.status(500).json({ error: "Error al escribir en el archivo" });
    }
  } else {
    res.status(400).json({ error: "Debe completar todos los datos" });
  }
  */
});

//------------------------------------------------------------------------ PETICION PUT

router.put("/:id", (req, res) => {
  let items = getProducts();
  let idProducto = parseInt(req.params.id);

  let { title, description, price, thumbnail, code, stock } = req.body;

  const itemId = idProducto;
  const newTitle = title;
  const newDescription = description;
  const newPrice = price;
  const newThumbnail = thumbnail;
  const newCode = code;
  const newStock = stock;

  if (isNaN(idProducto)) {
    return res.status(400).json({ error: "El id debe ser numérico" });
  }

  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    if (title && description && price && thumbnail && code && stock) {
      let codeAControlar = code;
      console.log("El code a controlar es: " + codeAControlar);
      let itemsFiltrados = items.filter(
        (producto) => producto.id !== idProducto
      );
      let checkCode = itemsFiltrados.findIndex(
        (producto) => producto.code === codeAControlar
      );
      if (checkCode !== -1) {
        console.log(`El CODE ${code} ya está siendo usado...!!!`);
        return res.status(400).json({
          error: `El CODE ${code} ya está siendo usado`,
        });
      }
      items[itemIndex].title = newTitle;
      items[itemIndex].description = newDescription;
      items[itemIndex].price = newPrice;
      items[itemIndex].thumbnail = newThumbnail;
      items[itemIndex].code = newCode;
      items[itemIndex].stock = newStock;

      fs.writeFile(ruta, JSON.stringify(items, null, 2), "utf8", (err) => {
        if (err) {
          console.error("Error al escribir en el archivo:", err);
          return res.status(500).json({
            error: "Error al escribir en el archivo",
          });
        } else {
          console.log("Elemento editado exitosamente.");
          res.status(200).json({ productoModificado: items[itemIndex] });
        }
      });
    } else {
      return res.status(400).json({
        error: "Faltan datos de completar en el body",
      });
    }
  } else {
    console.log("Elemento no encontrado.");
    return res.status(404).json({
      error: "Elemento no encontrado",
    });
  }
});

//------------------------------------------------------------------------ PETICION DELETE

router.delete("/:id", (req, res) => {
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
    res.json({ status: "ok", data: resultado });
  } else {
    res.json({ status: "error", mensaje: `El id ${pid} no existe` });
  }
});

router.get("*", (req, res) => {
  res.send("Error 404 - page not found");
});

module.exports = router;
