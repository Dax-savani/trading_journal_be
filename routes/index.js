const appRouter = require("express").Router();
const stockRouter = require('../controllers/stock');
const userRouter = require('../controllers/users');
const {auth} = require("../middleware/auth");

appRouter.use('/api/user', userRouter);
appRouter.use('/api/stock', auth, stockRouter);

module.exports = appRouter;
