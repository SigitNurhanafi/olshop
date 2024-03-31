const modelProduct  = require('../model/Product.model');
const httpResponses = require('../utils/responses');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await modelProduct.getAllProducts();
        return httpResponses.sendSuccess(res, { data: { products } });
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

exports.getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await modelProduct.getProductById(productId);
        if (product) {
            return httpResponses.sendSuccess(res, { data: { product } });
        } else {
            return httpResponses.sendError(res, 404, 'Product not found');
        }
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

exports.addProduct = async (req, res) => {
    let { name, price, description, category, sku } = req.body;

    if (!name || typeof name !== 'string') {
        return httpResponses.sendError(res, 400, 'Name must be string');
    }

    price = parseFloat(price);
    if (!price || typeof price !== 'number') {
        return httpResponses.sendError(res, 400, 'Price must be float string');
    }

    if (!description || typeof description !== 'string') {
        return httpResponses.sendError(res, 400, 'Deskripsi must be string');
    }

    if (!sku || typeof sku !== 'string') {
        return httpResponses.sendError(res, 400, 'SKU must be string');
    }

    if (!sku || typeof category !== 'string') {
        return httpResponses.sendError(res, 400, 'Category must be string');
    }

    try {
        const foundProduct = await modelProduct.getProductBySku(sku);
        
        if (foundProduct) {
            return httpResponses.sendError(res, 400, `Product with SKU ${sku} already exists with ID ${foundProduct.id}`);
        }

        const product = await modelProduct.createProduct(name, price, description, category, sku);
        return httpResponses.sendSuccess(res, { 
            message: 'Product created successfully', 
            id: product.lastID 
        }, 201);
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

exports.updateProduct = async (req, res) => {
    let productId = parseInt(req.params.id);
    let { name, price, description, category, sku } = req.body;

    const foundProductById = await modelProduct.getProductById(productId);
    if (!foundProductById) {
        return httpResponses.sendError(res, 404, 'Product not found');
    }

    if (!name || typeof name !== 'string') {
        return httpResponses.sendError(res, 400, 'Name must be string');
    }

    price = parseFloat(price);
    if (!price || typeof price !== 'number') {
        return httpResponses.sendError(res, 400, 'Price must be float string');
    }

    if (!description || typeof description !== 'string') {
        return httpResponses.sendError(res, 400, 'Deskripsi must be string');
    }

    if (!sku || typeof sku !== 'string') {
        return httpResponses.sendError(res, 400, 'SKU must be string');
    }

    if (!sku || typeof category !== 'string') {
        return httpResponses.sendError(res, 400, 'Category must be string');
    }

    try {
        const foundProductBySku = await modelProduct.getProductBySku(sku);
    
        if (foundProductBySku && foundProductBySku.id !== undefined && foundProduct.id !== productId) {
            return httpResponses.sendError(res, 400, `Product with SKU ${sku} already exists with ID ${foundProduct.id}`);
        }
        
        await modelProduct.updateProduct(productId, { name, price, description, category, sku });
        return httpResponses.sendSuccess(res, { message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = parseInt(req.params.id);

    try {
        const foundProduct = await modelProduct.getProductById(productId);
        if (!foundProduct) {
            return httpResponses.sendError(res, 404, 'Product not found');
        }

        await modelProduct.deleteProduct(productId);
        return httpResponses.sendSuccess(res, { message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return httpResponses.sendError(res, 500);
    }
};
