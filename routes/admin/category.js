const router = require('express').Router();
const {getCategories, addCategory, updateCategory,deleteCategory} = require('../../controllers/admin/category')

router.get('/category', getCategories)
router.post('/category', addCategory)
router.patch('/category/:id', updateCategory)
router.delete('/category/:id', deleteCategory)

module.exports = router