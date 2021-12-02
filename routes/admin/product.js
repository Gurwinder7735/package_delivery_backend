const router = require('express').Router();
const {getProduct, getProducts, addProduct, updateProduct, deleteProduct } = require('../../controllers/admin/product')

router.get('/product/:id', getProduct)
router.get('/products', getProducts)
router.post('/product', addProduct)
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

module.exports = router

