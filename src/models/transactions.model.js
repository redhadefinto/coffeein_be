// const { db } = require("../configs/environment");
const db = require('../configs/postgre');

const createTransaction = (client, body, userId) => {
  return new Promise((resolve, reject) => {
    const {payment_id, delivery_id, promo_id, notes, status_id} = body;
    const sql = "INSERT INTO transactions (user_id, payment_id, delivery_id, promo_id, notes, status_id) values ($1, $2, $3, $4, $5, $6) RETURNING id";
    const values = [userId, payment_id, delivery_id, promo_id, notes, status_id];
    client.query(sql, values, (err, result) => {
      if(err) return reject(err);
      resolve(result);
    });
  });  
};

const createDetailTransaction = (client, body, transactionId) => {
  return new Promise((resolve, reject) => {
    const { products } = body;
    let sql = `INSERT INTO transactions_products_sizes (transactions_id, product_id, size_id, quantity, subtotal) values`;
    let values = [];
    products.forEach((product, idx) => {
      const { product_id, size_id, quantity, subtotal } = product;
      if(values.length) sql += ", ";
      sql += `($${1 + 5 * idx}, $${2 + 5 * idx}, $${3 + 5 * idx}, $${4 + 5 * idx}, $${5 + 5 * idx})`;
      values.push(transactionId, product_id, size_id, quantity, subtotal);
    });
    client.query(sql, values, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const getTransaction = (client, transactionId) => {
  return new Promise((resolve, reject) => {
    const sql = `select u.email, p.product_name, p.image, s."size", pr.code, py."method" as "payment_method", st."name" as "status", tps.quantity, tps.subtotal from transactions_products_sizes tps
    join transactions t on t.id = tps.transactions_id 
    join products p on p.id = tps.product_id
    join sizes s on s.id = tps.size_id
    join users u on u.id = t.user_id
    join payments py on py.id = t.payment_id 
    join promos pr on pr.id = t.promo_id 
    join status st on st.id = t.status_id where t.id = $1;`;
    client.query(sql, [transactionId], (err, result) => {
      if(err) return reject(err);
      resolve(result);
    });
  });
};

const getHistory = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `select u.email, tps.transactions_id, p.product_name, p.image, s."size", pr.code, py."method" as "payment_method", st."name" as "status", tps.quantity, tps.subtotal from transactions_products_sizes tps
    join transactions t on t.id = tps.transactions_id 
    join products p on p.id = tps.product_id
    join sizes s on s.id = tps.size_id
    join users u on u.id = t.user_id
    join payments py on py.id = t.payment_id 
    join promos pr on pr.id = t.promo_id 
    join status st on st.id = t.status_id where u.id = $1`;
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { createTransaction, createDetailTransaction, getTransaction, getHistory };