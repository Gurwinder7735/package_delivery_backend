const router = require('express').Router();
const {getSubCategories, addSubCategory, updateSubCategory,deleteSubCategory} = require('../../controllers/admin/subCategory')

router.get('/subCategory/:id', getSubCategories)
router.post('/subCategory/:id', addSubCategory)
router.patch('/subCategory/:id', updateSubCategory)
router.delete('/subCategory/:id', deleteSubCategory)

module.exports = router