const productsLogic = require("../business-logic-layer/products-logic");
const express = require("express");
const router = express.Router();

// GET all categories
router.get("/categories", async (request, response) => {
    try {
        const categories = await productsLogic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err);
    }
});

// GET products by category
router.get("/categories/:categoryId", async (request, response) => {
    try {
        const categoryId = +request.params.categoryId;
        const products = await productsLogic.getProductsByCategoryAsync(categoryId);
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err);
    }
});

// POST one product
router.post("/", async (request, response) => {
    try {
        const product = request.body;
        const addedProduct = await productsLogic.addOneProductAsync(product);
        response.status(201).json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err);
    }
})

// DELETE one product
router.delete("/:prodId", async (request, response) => {
    try {
        const prodId = +request.params.prodId;
        await productsLogic.deleteOneProductAsync(prodId);
        response.sendStatus(204);
    }
    catch (err) { 
        response.status(500).send(err);

    }
});

module.exports = router;