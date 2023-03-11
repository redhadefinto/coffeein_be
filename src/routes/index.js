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


const masterRouter = Router();
masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);
masterRouter.use('/promo', promoRouter);
masterRouter.use('/history', historyRouter);
masterRouter.use('/product/image', express.static('images'));
masterRouter.use('/auth', authRouter);

module.exports = masterRouter;
