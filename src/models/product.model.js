const db = require("../configs/postgre");

const getProducts = (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT p.id, p.product_name, p.price, p.image, c.category_name 
                    FROM products p 
                    JOIN categories c ON p.category_id = c.id`;

    if (query.name) {
      sqlQuery += ` WHERE lower(p.product_name) LIKE lower('%${query.name}%')`;
    }

    if (query.categories) {
      sqlQuery += ` WHERE lower(c.category_name) LIKE lower('%${query.categories}%')`;
    }

    let order = "p.id ASC";
    if (query.order === "cheapest") order = "p.price ASC";
    if (query.order === "priciest") order = "p.price DESC";
    sqlQuery += ` ORDER BY ${order}`;

    if (query.limit) {
      const limit = parseInt(query.limit) || 5;
      const page = parseInt(query.page) || 1;
      const offset = parseInt(page - 1) * limit;
      sqlQuery += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    db.query(sqlQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};


const getMetaProducts = (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select count(*) as total_data from products p`;

    db.query(sqlQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      const totalData = parseInt(result.rows[0].total_data);
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 5;
      const totalPage = Math.ceil(totalData / limit);
      let next = null;
      let prev = null;
      if (page > 1) prev = `localhost:8080/products?page=${page - 1}&limit=${limit}`;
      if (page < totalPage) next = `localhost:8080/products?page=${page + 1}&limit=${limit}`;
      
      
      const meta = {
        totalData,
        next,
        prev,
        totalPage,
      };
      resolve(meta);
    });
  });
};

const getProductDetail = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `select p.id, p."product_name", p.image, p.price, pc."category_name"
    from products p 
    join categories pc on p.category_id = pc.id 
    WHERE p.id = $1`;
    const values = [params.productId];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertProduct = (data, file) => {
  return new Promise((resolve, reject) => { 
    const sqlQuery = `insert into products (product_name, price, category_id, image) values ($1, $2, $3) RETURNING *`;
    // parameterized query
    let fileLink = "";
    if(file) {
      fileLink = ` /images/${file.filename}`;
    }

    const values = [data.product_name, data.price, data.category_id, fileLink];
    db.query(sqlQuery, values, (err, result) => {
      if(err) {
        reject (err);
        return;
      }
      resolve(result);
    });
  });
};  

const updateProduct = (body, params, file) => {
  // const { body, params } = req;
  return new Promise((resolve, reject) => {
    let sqlQuery = "UPDATE products SET ";
    let values = [];
    let i = 1;
    for (const [key, val] of Object.entries(body)) {
      sqlQuery += `"${key}" = $${i}, `;
      values.push(val);
      i++;
    }
    // console.log(i)
    if(file) { 
    const fileLink = `/images/${file.filename}`;
            sqlQuery += `image = '${fileLink}', `; }
    // console.log(req.file.filename);
    sqlQuery = sqlQuery.slice(0, -2);
    // console.log(sqlQuery);
    sqlQuery += ` WHERE id = $${i} RETURNING *`;
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


const deleteProduct = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `delete from products where id = $1`;
    const values = [params.productId];
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
  getProducts,
  insertProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
  getMetaProducts
};