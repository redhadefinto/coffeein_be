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
      sqlQuery += ` AND p.category_id = ${query.categories}`;
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
    if (query.name) {
      sqlQuery += ` WHERE lower(p.product_name) LIKE lower('%${query.name}%')`;
    }

    if (query.categories) {
      if (query.name) {
        sqlQuery += ` AND p.category_id = ${query.categories}`;
      } else {
        sqlQuery += ` WHERE p.category_id = ${query.categories}`;
      }
    }
    db.query(sqlQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const totalData = parseInt(result.rows[0]?.total_data || 0);
      // console.log(total.length)
      // const totalData = total.length;
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit);
      const totalPage = Math.ceil(totalData / limit);
      let next = null;
      let prev = null;
      if (page > 1)
        prev = {
          page: `${page - 1}`,
          limit: `${limit}`,
        };
      if (page < totalPage)
        next = {
          page: `${page + 1}`,
          limit: `${limit}`,
        };

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
    const sqlQuery = `select p.id, p."product_name", p.image, p.price, pc.id as categories_id, p.desc
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

const getProductDetailWithPromo = (params) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `select p.id, p."product_name", p.image, p.price, p.desc, pc.id as categories_id, pr.discount, pr.expired 
    from products p 
    join categories pc on p.category_id = pc.id 
    join promos pr on pr.product_id = p.id
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

const insertProduct = (data) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into products (product_name, price, category_id, "desc") values ($1, $2, $3, $4) RETURNING *`;

    const values = [data.product_name, data.price, data.category_id, data.desc];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertProductPromo = ({ product_name, price, category_id, desc }) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into products (product_name, price, category_id, "desc") values ($1, $2, $3, $4) RETURNING *`;

    const values = [product_name, price, category_id, desc];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateProductImage = (data, id) => {
  // console.log(id);
  return new Promise((resolve, reject) => {
    const sqlQuery = `update products set image = $1 where id = $2 RETURNING *`;

    const values = [data, id];
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updateProduct = (body, params) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = "UPDATE products SET";
    let values = [];
    let index = 1;

    let keys = Object.keys(body);
    for (let key of keys) {
      let value = body[key];
      if (key === "desc") {
        key = `"${key}"`; // Menambahkan tanda petik pada key "desc"
      }
      if (value !== undefined) {
        sqlQuery += ` ${key} = $${index},`;
        values.push(value);
        index++;
      }
    }

    sqlQuery = sqlQuery.slice(0, -1); // Menghapus tanda koma terakhir
    sqlQuery += ` WHERE id = $${index}`;
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

const updateProductWithPromo = (
  { product_name, price, category_id, desc },
  params
) => {
  return new Promise((resolve, reject) => {
    let updateFields = []; // Menyimpan kolom yang akan diupdate
    let values = []; // Menyimpan nilai yang akan diupdate

    if (product_name) {
      updateFields.push("product_name");
      values.push(product_name);
    }

    if (price) {
      updateFields.push("price");
      values.push(price);
    }

    if (category_id) {
      updateFields.push("category_id");
      values.push(category_id);
    }

    if (desc) {
      updateFields.push("desc");
      values.push(desc);
    }

    if (updateFields.length === 0) {
      // Tidak ada atribut yang diupdate
      resolve("No attributes to update");
      return;
    }

    // Membuat dynamic SQL query
    const updateFieldsString = updateFields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");
    const sqlQuery = `UPDATE products SET ${updateFieldsString} WHERE id = $${
      updateFields.length + 1
    }`;

    // Menambahkan ID produk ke dalam values
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

const getProductDiscount = (query) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `SELECT p.id, p.product_name, p.price, p.image, c.category_name, pr.discount
                    FROM products p 
                    JOIN categories c ON p.category_id = c.id
                    JOIN promos pr ON pr.product_id = p.id`;

    if (query.name) {
      sqlQuery += ` WHERE lower(p.product_name) LIKE lower('%${query.name}%')`;
    }

    if (query.categories) {
      sqlQuery += ` AND p.category_id = ${query.categories}`;
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

module.exports = {
  getProducts,
  insertProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
  getMetaProducts,
  updateProductImage,
  insertProductPromo,
  getProductDiscount,
  getProductDetailWithPromo,
  updateProductWithPromo,
};
