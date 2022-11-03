const express = require("express");
const app = express();
const { Router } = express;
const Contenedor = require("./contenedor");
const contenedor = new Contenedor();
const routerProducts = Router();
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
app.use("/api/productos", routerProducts);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.listen(port, () =>
    console.log(`The server is running in: http://localhost:${port} 🔐`)
);
app.get("/", (req, res) => {
    res.send(
        "<h1 style='color:blue;'>Welcome to one of the biggest e-commerce around US</h1>"
    );
});
app.get("/formulario", (req, res) => {
    res.sendFile(__dirname + "/public/index.html"); //respondemos con un archivo
});

app.post("/formulario", (req, res) => {
    const { body } = req;
    console.log(body);
    contenedor.save(body);
    res.send("Thank you for sharing your data!");
});

routerProducts.get("", async (req, res) => {
    const products = await contenedor.getAll();
    res.json(products);
});

routerProducts.get("/:id", async (req, res) => {
    const { id } = req.params;
    const products = await contenedor.getAll();
    const product = await contenedor.getById(id);
    if (id > products.length) {
        res.json({
            error: "This product was not found",
            productList: products,
        });
    } else {
        res.json(product);
    }
});

routerProducts.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const products = await contenedor.getAll();

    if (id > products.length) {
        res.json({
            error: "This product was not found",
            productList: products,
        });
    } else {
        await contenedor.deleteById(id);
        res.json({
            success: true,
            msg: "This product was deleted successfully.",
        });
    }
});

routerProducts.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, thumbnail } = req.body;
        await contenedor.updateById(id, title, price, thumbnail);
        res.json({ succes: true });
    } catch (error) {
        res.json({ error: true, msj: "error" });
    }
});