const Router = require('express');
const router = new Router();
const mastersRouter = require('./mastersRouter');
const userRouter = require('./userRouter');
const cuttypeRouter = require('./cuttypeRouter');

router.use('/user', userRouter);
router.use('/cuttype', cuttypeRouter);
router.use('/masters', mastersRouter);

module.exports = router;