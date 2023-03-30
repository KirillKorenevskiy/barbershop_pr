const Router = require('express');
const router = new Router();
const cuttypeController = require('../controllers/cuttypeController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), cuttypeController.create);
router.get('/', cuttypeController.getAll);

module.exports = router;