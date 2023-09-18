const Router = require("express").Router;
const router = Router();   
const arrayProducts = require("../archivos/productos.json"); 


router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).render("home", {
    titlePage: "Home Page de la ferretería El Tornillo",
    estilo: "styles.css",
  });
});

router.get("/products", (req, res) => {
  let index = parseInt(req.query.index) || 0;
  const array = arrayProducts;
  const totalProducts = array.length;

  const lastIndex = array.length - 1;

  if (index < 0) {
    index = lastIndex;
  } else if (index >= totalProducts) {
    index = 0;
  }

  const product = array[index];

  res.header("Content-type", "text/html");
  res.status(200).render("products", {
    product: product,
    index: index,
    titlePage: "Página de productos",
    estilo: "productsStyles.css"
  });
});


router.get("/realtimeproducts", (req, res) => {
  let index = parseInt(req.query.index) || 0;
  const array = arrayProducts;
  const totalProducts = array.length;

  const lastIndex = array.length - 1;

  if (index < 0) {
    index = lastIndex;
  } else if (index >= totalProducts) {
    index = 0;
  }

  const product = array[index];

  res.header("Content-type", "text/html");
  res.status(200).render("realTimeProducts", {
    product: product,
    index: index,
    titlePage: "Página de productos en tiempo real",
    estilo: "realTimeProducts.css",
  });
});

module.exports = router;