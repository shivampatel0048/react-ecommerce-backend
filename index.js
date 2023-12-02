const express = require("express");
const app = express();

const mongoose = require('mongoose');
const productsRouter = require("./routes/Products");
// const categoriesRouter = require("./routes/Categories");
// const brandsRouter = require("./routes/Brands");
const { createProduct } = require("./controller/Product");
const cors = require("cors")

//middlewares
app.use(cors({
    exposedHeaders:["X-Total-Count"]
}))
app.use(express.json());
app.use("/products", productsRouter.router)
// app.use("/categories", categoriesRouter.router)
// app.use("/brands", brandsRouter.router)

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://0.0.0.0:27017/ecommerce');
    console.log("Database Connected.");
}

app.get("/", (req, res) => { 
    res.json({ status: "success" })
})

app.post("/products", createProduct);

app.listen(8080, () => {
    console.log("Server is running on port 8080.");
})