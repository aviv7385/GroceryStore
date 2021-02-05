const dal = require("../data-access-layer/dal");

// get all categories from the DB
async function getAllCategoriesAsync() {
    const sql = `SELECT * FROM categories`;
    const categories = await dal.executeAsync(sql);
    return categories;
}

// get products by category id from the DB
async function getProductsByCategoryAsync(categoryId) {
    const sql = `SELECT * FROM products WHERE categoryId=${categoryId}`;
    const products = await dal.executeAsync(sql);
    return products;
}

// add one product to the DB
async function addOneProductAsync(product){
    const sql = `INSERT INTO products(productId, productName, produceDate, expireDate, categoryId, productPrice) 
                VALUES(DEFAULT, '${product.productName}', '${product.produceDate}', 
                '${product.expireDate}', ${product.categoryId}, ${product.productPrice})`;
    const info = await dal.executeAsync(sql);
    product.productId = info.insertId;
    return product;
}

// delete on product from the DB
async function deleteOneProductAsync (productId){
    const sql = `DELETE FROM products WHERE productId = ${productId}`;
    await dal.executeAsync(sql);
}

module.exports = {
    getAllCategoriesAsync,
    getProductsByCategoryAsync,
    addOneProductAsync,
    deleteOneProductAsync
}