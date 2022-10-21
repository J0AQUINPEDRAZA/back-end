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

  async getById(id){
      const fs = require('fs');
      const ruta = this.fileName;
      try {
          const archivo = await fs.promises.readFile(ruta, 'utf-8');
          const productos = JSON.parse(archivo);

          const producto = productos.find(p  => p.id === id); 
          return producto;
          
      } catch (error) {
          console.log('Se ha producido un error en getById(id)', 'error numero: ', error);
      } 
  }

  async deleteById(id){
      const fs = require('fs');
      const ruta = this.fileName;
      try {
          const archivo = await fs.promises.readFile(ruta, 'utf-8');
          const productos = JSON.parse(archivo);

          const newProductos = productos.filter((data)=>data.id !== id);
          
          const newProductosString = JSON.stringify(newProductos);

          await fs.promises.writeFile(ruta, newProductosString)

      } catch (error) {
          console.log('Se ha producido un error en deleteById(id)', 'error numero: ', error);
      } 
  }

  async save(producto){
      const fs = require('fs');
      const ruta = this.fileName;
      try {
          const archivo = await fs.promises.readFile(ruta, 'utf-8');
          const productos = JSON.parse(archivo);
          let newId =0;
          if (productos.length >0){
              const auxArray = [];
              productos.forEach(element => {
                  auxArray.push(element.id);
              });
              newId = Math.max(...auxArray);
          }
          newId++;
          const newProducto = {...producto, id:newId};
          const auxProductos = [...productos, newProducto];
          const newProductosString = JSON.stringify(auxProductos);

          await fs.promises.writeFile(ruta, newProductosString)

          return newId;
          
      } catch (error) {
          console.log('Se ha producido un error en save()', 'error numero: ', error);
      } 
  }

  async deleteAll(){
      const fs = require('fs');
      const ruta = this.fileName;
      try {
          const Productos = [];
          
          const ProductosString = JSON.stringify(Productos);

          await fs.promises.writeFile(ruta, ProductosString)

      } catch (error) {
          console.log('Se ha producido un error', 'error numero: ', error);
      } 
  }

}



const contenedor = new Contenedor('productos.txt');


contenedor.save(    {                                                                                                                                                    
  "title": "Calculadora",                                                                                                                              
  "price": 200,                                                                                                                                     
  "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",                                                                                                                                                                                      
}).then((res)=>console.log(res));