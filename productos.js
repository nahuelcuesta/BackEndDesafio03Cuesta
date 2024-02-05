import ProductManager from "./productManager.js";

const obtenerProductos = async () => {
    const productos = new ProductManager();
    return await productos.getProducts();
};

export const productsPromise = obtenerProductos();

