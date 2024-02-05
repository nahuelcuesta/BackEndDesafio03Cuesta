import ProductManager from "./productManager.js";
const productos = new ProductManager();

const obtenerProductos = async () => {
    return await productos.getProducts();
};

export const productsPromise = obtenerProductos();




