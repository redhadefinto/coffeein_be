const db = require("../configs/postgre");

const getPromo = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `select pm.id, pr.product_name, pm.coupon_code, pm.discount, pm.expired from promo pm join products pr on pm.product_id = pr.id order by $1;`;
    const values = ["pm.id"];
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

const insertPromo = ({ discount, expired, code }, id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into promos (code, discount, product_id, expired) values ($1, $2, $3, $4) RETURNING *`;
    // parameterized query
    console.log(code, discount, expired);
    const values = [code, discount, id, expired];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updatePromo = (data, params) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = "UPDATE promos SET";
    let values = [];
    let index = 1;

    let keys = Object.keys(data);
    for (let key of keys) {
      let value = data[key];
      if (value !== undefined) {
        sqlQuery += ` ${key} = $${index},`;
        values.push(value);
        index++;
      }
    }

    sqlQuery = sqlQuery.slice(0, -1); // Removing the trailing comma
    sqlQuery += ` WHERE product_id = $${index}`;
    values.push(params.productId);

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
  deletePromo,
};
