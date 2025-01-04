const appRouter = require("express").Router();
const stockRouter = require('../controllers/stock');
const userRouter = require('../controllers/users');
const playbookRouter = require('../controllers/playbook');
const {auth} = require("../middleware/auth");

appRouter.use('/api/user', userRouter);
appRouter.use('/api/stock', auth, stockRouter);
appRouter.use('/api/playbook', auth, playbookRouter);

module.exports = appRouter;
