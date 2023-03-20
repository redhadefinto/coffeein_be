// URL = PROTOCOL://HOST:PORT/ENDPOINT
// protocol = http, https
// host = ip, domain
// port = ketika ip ada port
// endpoint = membedakan antar rute

const { Router } = require('express');

// welcome /
const welcomeRouter = require("./welcome.route");
// users /users
const usersRouter = require('./users.route');
// product /products
const productsRouter = require('./products.route');
const promoRouter = require('./promo.route');
const historyRouter = require('./history.route');
const express = require('express');
const authRouter = require('./auth.route');
const transactionRouter = require('./transaction.route');
const commentsRouter = require('./comments.route');
const errorRouter = require('./error.router');
const cloudRouter = require('./cloud.route');

const masterRouter = Router();
masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);
masterRouter.use('/promo', promoRouter);
masterRouter.use('/history', historyRouter);
masterRouter.use('/auth', authRouter);
masterRouter.use("/", welcomeRouter);
masterRouter.use("/transactions", transactionRouter);
masterRouter.use("/images", express.static('./public/images'));
masterRouter.use('/comments', commentsRouter);
masterRouter.use("/error", errorRouter);
masterRouter.use("/cloud", cloudRouter);


module.exports = masterRouter;
