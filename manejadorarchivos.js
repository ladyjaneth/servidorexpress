const fs = require('fs');
class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = './'+nombreArchivo;
        fs.writeFileSync(this.nombreArchivo, '[]', error => {
            console.log(`Error al crear el archivo ${nombreArchivo}`);
        });
    }

    async save(producto){
        try {
            const arrayProductos = await this.getAll();            
            producto.id = arrayProductos.length +1;
            arrayProductos.push(producto);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arrayProductos));
        } catch (error) {
            producto.id = 0;
            console.log('Error al agregar el producto al archivo' + error);
        }        
        return producto.id;
    }

    async getById(id){
        let producto;
        try {
            const arrayProductos = await this.getAll();
            const productoEncontrado = await arrayProductos.find(producto => producto.id == id);
            producto = await productoEncontrado == -1 ? null : productoEncontrado;
        } catch (error) {
            producto = null;
            console.log(`Error al buscar producto por id ${id}`);
        }

        return producto;
    }

    async getAll(){
        let arrayProductos;
        try{
            const archivoProductos = await fs.promises.readFile(this.nombreArchivo);
            arrayProductos = await JSON.parse(archivoProductos);
        }catch(error){
            console.log(`Error al leer el archivo ${this.nombreArchivo} ${error}`);
        }

        return arrayProductos;
    }

    async deleteById(id){
        try {
            const productos = await this.getAll();
            const producto = await this.getById(id);
            productos.splice(producto, 1);
        } catch (error) {
            console.log(`Error al eliminar el producto del archivo por el id ${id} ${error}`);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.nombreArchivo, '[]');
            console.log('Se han eliminado los productos');
        } catch (error) {
            console.log('Error al eliminar los productos');
        }
    }

}

module.exports = Contenedor; //exportar la Clase Contenedor