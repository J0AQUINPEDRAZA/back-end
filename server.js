const express = require("express");


const app = express();

const PORT = process.env.PORT || 8080;




class Contenedor {
    constructor (fileName){
        this.fileName = fileName;
    }
  
    async getAll(){
        const fs = require('fs');
        const ruta = this.fileName;
        try {
            const archivo = await fs.promises.readFile(ruta, 'utf-8');
            const productos = JSON.parse(archivo);
            return productos;
            
        } catch (error) {
            console.log('Se ha producido un error en getAll()', 'error numero: ', error);
        } 
               
    }
  
  }

const getRandomInt = (max) => {
  return 
}

let numero = getRandomInt(5);



app.get("/productos", async(req,res)=>{
    const contenedorProductos = new Contenedor("productos.txt");
    const allProducts = await contenedorProductos.getAll()
    res.send(allProducts)
})

app.get("/productoRandom", async(req,res)=>{
    const contenedorProductos = new Contenedor("productos.txt");
    const allProducts = await contenedorProductos.getAll()
    const numRandom = Math.floor(Math.random() * (allProducts.length));
    const productoRandom = allProducts[numRandom]
    res.send(productoRandom)
})

app.get("/",(req,res)=>{
    res.send(`Bienvenido al server!`)
})


app.listen(PORT,()=>console.log(`server listeing on port ${PORT}`));