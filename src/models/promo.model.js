const db = require("../configs/postgre");

const getPromo = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `select pm.id, pr.product_name, pm.coupon_code, pm.discount, pm.expired from promo pm join products pr on pm.product_id = pr.id order by $1;`;
    const values = ['pm.id'];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getPromoDetail = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `select pm.id, pr.product_name, pm.coupon_code, pm.discount, pm.expired from promo pm join products pr on pm.product_id = pr.id where pm.id = $1`;
    const values = [params.promoId];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertPromo = (data) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into promo (product_id, coupon_code, discount, expired) values ($1, $2, $3 $4) RETURNING *`;
    // parameterized query
    const values = [
      data.product_id,
      data.coupon_code,
      data.discount,
      data.expired
    ];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updatePromo = (params, data) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `update promo set product_id = $1, coupon_code = $2, discount = $3, expired = $4 where id = $5 RETURNING *;`;
    const values = [
      data.product_id,
      data.coupon_code,
      data.discount,
      data.expired,
      params.promoId
    ];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const deletePromo = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `delete from promo where id = $1`;
    const values = [params.promoId];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getPromo,
  getPromoDetail,
  insertPromo,
  updatePromo,
  deletePromo
};