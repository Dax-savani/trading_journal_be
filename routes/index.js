const appRouter = require("express").Router();
const stockRouter = require('../controllers/stock');

appRouter.use('/api/stock',stockRouter);

module.exports = appRouter;
