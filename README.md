# Archivo readme
Información útil para analizar este repositorio


1. ## ALUMNO: 

Mauricio Javier ALONSO


2. ## COMISION:

 N° 55565


3. ## TITULO DESAFIO ENTREGABLE: 

Práctica de integración sobre tu ecommerce  

4. ## N° DESAFIO ENTREGABLE: 

N° 6

5. ## CONSIGNA DESAFIO ENTREGABLE: 

Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos: Persistencia MongoDB, Separar FileSystem y DB en carpeta DAO, implementar un chat con websocket y handlebars.



6. ## Como configurar una peticiones a la base de datos / Producto:

En postman: 
GET / http://localhost:8080/api/products

GET (con limit) / http://localhost:8080/api/products?limit=2

GET (con Id) / http://localhost:8080/api/products/650ccb2a40203de5f1000744

POST / http://localhost:8080/api/products
{
      "title":" Amoladora Bosh Professional",
      "description": "GWS 850 - Azul - 220V",
      "price":"40000",
      "thumbnail":"https://http2.mlstatic.com/D_NQ_NP_2X_652973-MLA53056734600_122022-F.webp",
      "code":"TA-104",
      "stock":"1" 

}

DELETE / http://localhost:8080/api/products/650ce08f9243a5f35e588175

PUT / http://localhost:8080/api/products/650ccae740203de5f1000741

{
      "title":" Tender para la ropa MEGAMAX PRO",
      "description": "Pie aluminio plegable",
      "price":"21000",
      "thumbnail":"https://http2.mlstatic.com/D_NQ_NP_685663-MLU69658396260_052023-O.webp",
      "code":"TA-100",
      "stock":"7" 

}

6. ## Como configurar una petición POST de Carrito:

GET / http://localhost:8080/api/carts

GET (con Id) / http://localhost:8080/api/carts/650cd720533cbe8515329224

POST / http://localhost:8080/api/products

{
  "products": [    
    {"id": "650ccae740203de5f1000741",
     "quantity": 2
     },
        {"id": "650ccb6440203de5f1000748",
     "quantity": 2
     },
             {"id": "650ccae740203de5f1000741",
     "quantity": 2
     }
  ]
}

6. ## FileSystem y MongoDB:

Puse todo el carpeta DAO, pero dejé funcionales las vistas de handlebars. El usuario puede elegir navegar dentro de filesystem o MongoDB