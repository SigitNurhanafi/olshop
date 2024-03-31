const modelProduct = require('../model/Product.model');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await modelProduct.getAllProducts();
        res.json({status:true, data:products});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({status:false, error: 'Internal Server Error'});
    }
};

exports.getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await modelProduct.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({status:false, error: 'Product not found'});
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({status:false, error: 'Internal Server Error'});
    }
};

exports.addProduct = async (req, res) => {
    let {name, price, description, category, sku} = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({status:false, error: 'Name must be string'});
    }

    price = parseFloat(price);
    if (!price || typeof price !== 'number') {
        return res.status(400).json({status:false, error: 'Price must be float string'});
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).json({status:false, error: 'Deskripsi must be string'});
    }

    if (!sku || typeof sku !== 'string') {
        return res.status(400).json({status:false, error: 'SKU must be string'});
    }

    if (!sku || typeof category !== 'string') {
        return res.status(400).json({status:false, error: 'Category must be string'});
    }

    try {
        const foundProduct = await modelProduct.getProductBySku(sku);
        
        if (foundProduct) {
            return res.status(400).json({status:false, message: `Have product with SKU ${sku}`});
        }

        const product = await modelProduct.createProduct(name, price, description, category, sku);
        res.status(201).json({status:true, id: product.lastID});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({status:false, error: 'Internal Server Error'});
    }
};

exports.updateProduct = async (req, res) => {
    let productId = parseInt(req.params.id);
    let {name, price, description, category, sku} = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({status:false, error: 'Name must be string'});
    }

    price = parseFloat(price);
    if (!price || typeof price !== 'number') {
        return res.status(400).json({status:false, error: 'Price must be float string'});
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).json({status:false, error: 'Deskripsi must be string'});
    }

    if (!sku || typeof sku !== 'string') {
        return res.status(400).json({status:false, error: 'SKU must be string'});
    }

    if (!sku || typeof category !== 'string') {
        return res.status(400).json({status:false, error: 'Category must be string'});
    }

    try {
        const foundProduct = await modelProduct.getProductBySku(sku);
    
        if (foundProduct && foundProduct.id !== undefined && foundProduct.id !== productId) {
            return res.status(400).json({
                status: false, 
                message: `Product with SKU ${sku} already exists with ID ${foundProduct.id}`
            });
        }
        
        await modelProduct.updateProduct(productId, {name, price, description, category, sku});
        res.json({status:true, message: 'Product updated successfully'});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({status:false, error: 'Internal Server Error'});
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = parseInt(req.params.id);

    try {
        const foundProduct = await modelProduct.getProductById(productId);
        if (!foundProduct) {
            return res.status(404).json({status:false, error: 'Product not found'});
        }

        await modelProduct.deleteProduct(productId);
        res.json({status:true, message: 'Product deleted successfully'});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({status:false, error: 'Internal Server Error'});
    }
};
