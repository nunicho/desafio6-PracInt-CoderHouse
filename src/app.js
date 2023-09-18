const express = require('express')
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js')
const vistasRouter = require("./routes/vistas.router.js");
const path = require("path"); // Importa el módulo 'path'
const fs = require("fs"); // Importa el módulo 'fs'

const http = require("http"); // Importa el módulo http para crear el servidor HTTP.
const socketIO = require("socket.io");



// HANDLEBARS - importación
const handlebars = require('express-handlebars')

const PORT=8080;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/products',productsRouter)
app.use("/api/carts", cartsRouter);

// HANDLEBARS - inicialización

const hbs = handlebars.create({
  helpers: {
    add: function (value, addition) {
      return value + addition;
    },
    subtract: function (value, subtraction) {
      return value - subtraction;
    },
  },
});

app.engine('handlebars', hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', vistasRouter)

app.use(express.static(__dirname+'/public'))

const serverExpress=app.listen(PORT,()=>{
console.log(`Server escuchando en puerto ${PORT}`);
})

const serverSocket = socketIO(serverExpress);

serverSocket.on('connection', socket=>{

  socket.on("productoAgregado", (data) => {
    console.log(`Se ha agregado ${data.title}`);
    serverSocket.emit("productoAgregado", data); 
  });

  function getProducts() {
    const ruta = path.join(__dirname, "archivos", "productos.json");
    if (fs.existsSync(ruta)) {
      return JSON.parse(fs.readFileSync(ruta, "utf-8"));
    } else {
      return [];
    }
  }

 socket.on("eliminarProducto", (productId) => {
   const productos = getProducts();

   function saveProducts(products) {
     const ruta = path.join(__dirname, "archivos", "productos.json");

     try {
       fs.writeFileSync(ruta, JSON.stringify(products, null, 2), "utf8");
     } catch (error) {
       console.error("Error al guardar productos:", error);    
     }
   }
   const productoIndex = productos.findIndex(
     (producto) => producto.id === productId
   );
   if (productoIndex !== -1) {
     productos.splice(productoIndex, 1);
     saveProducts(productos);
     serverSocket.emit("productosActualizados", productos);
   }
 }); 

  socket.emit("productosActualizados", getProducts());
})

