const db = require("../configs/postgre");

const getHistory = (data) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT h.id, p.product_name, p.price, p.image, s.name, h.quantity
    FROM histories h
    join products p ON h.product_id = p.id
    join users u on h.user_id = u.id
    join status s on h.status_id = s.id
    where u.id = $1`;
    // const values = ["u.id"];
    db.query(sqlQuery, [data.id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getHistoryDetail = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT h.id, p.product_name, u.display_name, p.price
    FROM history h 
    JOIN products p ON h.product_id = p.id
    JOIN users u ON h.user_id = u.id 
    where h.id = $1;`;
    const values = [params.historyId];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertHistory = (data) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into histories (user_id, product_id, status_id, quantity) values ($1, $2, $3, $4) RETURNING *`;
    // parameterized query
    const values = [
      data.user_id,
      data.product_id,
      data.status_id,
      data.quantity,
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

const updateHistory = (params, data) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `update history set product_id = $1, user_id = $2, quantity = $3, total_price = $4 where id = $5 RETURNING *`;
    const values = [
      data.product_id,
      data.user_id,
      data.quantity,
      data.total_price,
      params.historyId
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

const deleteHistory = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `delete from histories where id = $1`;
    // const values = [params.historyId];
    db.query(sqlQuery, [params.historyId], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getHistory,
  getHistoryDetail,
  insertHistory,
  updateHistory,
  deleteHistory,
};
