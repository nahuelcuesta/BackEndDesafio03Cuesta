import express from 'express';
import { productsPromise } from './productos.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 8080;

app.get('/products', async (req, res)=>{
const products = await productsPromise;
res.send(products)
})

app.get('/products/:pid', async (req, res) => {
    const productos = await productsPromise;
    const pid = parseInt(req.params.pid);

    const producto = productos.find((product) => product.id === pid);

    if (producto) {
        res.send(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.listen(PORT, ()=>{
    console.log(`Server run on port: ${PORT}`);
})