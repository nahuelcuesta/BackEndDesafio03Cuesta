/* const fs = require ('fs'); */
import { promises as fs } from 'fs';

class ProductManager {
    constructor(){
        this.path = './listaDeProductos.txt';
        this.products = []
    }
    static id = 0 

    addProduct = async (title, description, price, thumbnail, code, stock)=>{
        ProductManager.id++
        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct)

        await this.writeProducts(this.path, this.products);

    }
    writeProducts = async (path, data)=>{
        await fs.writeFile(path, JSON.stringify(data))
    }
    readProducts = async ()=>{
        let response = await fs.readFile (this.path, 'utf-8');
        return JSON.parse(response)
    }
    getProducts = async () => {
        try {
            let products = await this.readProducts();
            return products;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return []; 
        }
    }
    getProductsById = async (id)=>{
        try {
            let products = await this.readProducts();
            let prodFilter = products.find(product => product.id === id);
            if (prodFilter !== undefined) {
                return prodFilter;
            } else {
                throw new Error('No existe un producto con el ID proporcionado');
            }
        } catch (error) {
            console.error('Error al obtener productos por ID:', error);
            throw error; 
        }
    }

    updateProduct = async (id, dataObjectUpdate)=>{
        let products = await this.readProducts();
        let productToUpdate = products.find(product=>product.id === id);
        try{
            if (productToUpdate){
                Object.assign(productToUpdate, dataObjectUpdate);
                await this.writeProducts(this.path, products);
                console.log(`Producto con id "${id}" actualizado correctamente.`);
            }else{
                console.log(`No existe un producto con el ID "${id}". No se realizó ninguna operación de actualización.`);
            }
        }
        catch (error){
            console.log(error);
        }
    }
    deleteProduct = async (id) => {
        try {
            let response = await this.readProducts();
            let productExists = response.some(product => product.id === id);
    
            if (productExists) {
                let productFilter = response.filter(products => products.id !== id);
                await this.writeProducts(this.path, productFilter);
                console.log(`Producto con id "${id}" borrado correctamente.`);
            } else {
                console.log(`No existe un producto con el ID "${id}". No se realizó ninguna operación.`);
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }
}

export default ProductManager;