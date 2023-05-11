const db = require("../configs/postgre");

const getProfile = (id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select u.email, u.phone_number, p.first_name, p.last_name, p.display_name, p.address, p.image, p.birthday, p.gender from profile p join users u on p.id = u.id where p.id = $1`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const getProfileImage = (id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `select image from profile where id = $1`;
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const insertProfile = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `insert into profile (id, first_name, image) values ($1, $2, $3)`;
    // parameterized query
    db.query(
      sqlQuery,
      [
        parseInt(id),
        `guest`,
        "https://res.cloudinary.com/ddfixt2hr/image/upload/v1679733467/coffe_shop_users/users-image-1.webp",
      ],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
};

const updateProfile = (id, data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    if (data.email) {
      delete data.email;
    }
    if (data.phone) {
      delete data.phone;
    }
    if (data.image) {
      delete data.image;
    }
    // for (const key in data) {
    //   if (Object.prototype.hasOwnProperty.call(data, key) && data[key] === "") {
    //     delete data[key];
    //   }
    // }
    // if (Object.keys(data).length === 0) {
    //   resolve(); // Return early if there are no properties to update
    //   return;
    // }
    if (data.birthday === "") {
      delete data.birthday;
    }
    if (data.gender === "") {
      delete data.gender;
    }
    let sqlQuery = "UPDATE profile SET ";
    let values = [];
    let i = 1;
    const entries = Object.entries(data);
    for (const [key, val] of entries) {
      sqlQuery += `${key} = $${i}, `;
      values.push(val);
      i++;
    }
    sqlQuery = sqlQuery.slice(0, -2);
    sqlQuery += ` WHERE id = $${i} RETURNING *`;
    values.push(id);
    console.log(sqlQuery);
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

const updatePhoneNumber = (phone, id) => {
  return new Promise((resolve, reject) => {
    let sqlQuery = `update users set phone_number = $1 where id = $2 RETURNING phone_number`;
    db.query(sqlQuery, [phone, id], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

// const updateProfileImage = (id, data) => {
//   return new Promise((resolve, reject) => {
//     const sqlQuery = `insert into profile (id, first_name, image) values ($1, $2, $3)`;
//     // parameterized query
//     db.query(
//       sqlQuery,
//       [
//         parseInt(id),
//         `guest`,
//         "https://res.cloudinary.com/ddfixt2hr/image/upload/v1679733467/coffe_shop_users/users-image-1.webp",
//       ],
//       (err, result) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve(result);
//       }
//     );
//   });
// };

module.exports = {
  getProfile,
  insertProfile,
  updateProfile,
  getProfileImage,
  updatePhoneNumber,
};
