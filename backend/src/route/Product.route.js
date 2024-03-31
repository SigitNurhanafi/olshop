const express           = require('express');
const productController = require('../controller/Product.contoller');
const router            = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;