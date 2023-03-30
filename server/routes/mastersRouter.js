const Router = require('express');
const router = new Router();
const mastersController = require('../controllers/mastersController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), mastersController.create);
router.get('/', mastersController.getAll);
router.get('/:id', mastersController.getOne);
router.delete('/:name', mastersController.deleteByName);

module.exports = router;