const { getCMS,updateCMS } = require('../../controllers/admin/cms');

const router = require('express').Router();

router.get('/cms/:type', getCMS);
router.put('/cms/:type', updateCMS )

module.exports = router;

