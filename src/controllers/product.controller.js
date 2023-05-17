const productsModel = require("../models/product.model");
const promoModel = require("../models/promo.model");
const { uploader, uploaderUsers } = require("../utils/cloudinary");
const getProducts = async (req, res) => {
  try {
    const { query } = req;
    const result = await productsModel.getProducts(query);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Product Tidak Ditemukan",
      });
      return;
    }
    const productsDiscount = await productsModel.getProductDiscount(query);

    const mergedArray = [];

    // Membuat objek set berisi ID yang telah diproses
    const processedIds = new Set();

    // Memproses objek dari array1
    result.rows.forEach((obj) => {
      if (!processedIds.has(obj.id)) {
        mergedArray.push(obj);
        processedIds.add(obj.id);
      }
    });

    // Memproses objek dari array2 dengan preferensi pada objek yang memiliki diskon
    productsDiscount.rows.forEach((obj) => {
      if (!processedIds.has(obj.id)) {
        mergedArray.push(obj);
        processedIds.add(obj.id);
      } else if (obj.discount) {
        const index = mergedArray.findIndex((item) => item.id === obj.id);
        mergedArray[index] = obj;
      }
    });

    // console.log(mergedArray);
    // console.log(result.rows)
    const meta = await productsModel.getMetaProducts(query, result.rows);
    res.status(200).json({
      data: mergedArray,
      meta,
      msg: "Get Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

// params => ada 2
// query params (search, filter, sort, paginasi) => params yang kita gunakanan untuk melakukan manipulasi data
// req.query
// path params (get detail, get product) => variabel variable sql yang kita gunakan untuk mendapat sesuatu data yang lebih spesifik
// req.params

const getProductDetail = async (req, res) => {
  try {
    const { params } = req;
    const result = await productsModel.getProductDetail(params);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Product Tidak Ditemukan",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getProductDetailWithPromo = async (req, res) => {
  try {
    const { params } = req;
    const result = await productsModel.getProductDetailWithPromo(params);
    if (result.rows.length === 0) {
      res.status(404).json({
        data: result.rows,
        msg: "Product Tidak Ditemukan",
      });
      return;
    }
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const insertProduct = async (req, res) => {
  try {
    const { body } = req;
    // console.log(file);
    console.log(body);
    const result = await productsModel.insertProduct(body);
    const id = result.rows[0].id;
    const { data, err, msg } = await uploader(req, "product", id);
    if (err) throw { msg, err };
    if (!data) return res.status(200).json({ msg: "No File Uploaded" });
    const urlImage = data.secure_url;
    const datas = await productsModel.updateProductImage(urlImage, id);
    res.status(201).json({
      data: datas.rows,
      msg: "Create Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const insertProductPromo = async (req, res) => {
  try {
    const { body } = req;
    const result = await productsModel.insertProductPromo({
      product_name: body.product_name,
      price: body.price,
      category_id: body.category_id,
      desc: body.desc,
    });
    const id = result.rows[0].id;
    const { data, err, msg } = await uploader(req, "product", id);
    if (err) throw { msg, err };
    if (!data) return res.status(200).json({ msg: "No File Uploaded" });
    const urlImage = data.secure_url;
    const datas = await productsModel.updateProductImage(urlImage, id);
    const generatePromoCode = (length) => {
      let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let promoCode = "";

      for (let i = 0; i < length; i++) {
        promoCode += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      return promoCode;
    };

    // Contoh penggunaan dengan panjang 6 karakter
    const promoCode = generatePromoCode(6);
    // console.log(promoCode);

    const promo = await promoModel.insertPromo(
      { discount: body.discount, expired: body.expired, code: promoCode },
      id
    );
    res.status(201).json({
      data: datas.rows,
      promo: promo.rows,
      msg: "Create Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { body, params } = req;
    await productsModel.updateProduct(body, params);
    // const id = result.rows[0].id;
    const { data, err, msg } = await uploader(req, "product", params.productId);
    if (err) throw { msg, err };
    if (!data) return res.status(200).json({ msg: "No File Uploaded" });
    const urlImage = data.secure_url;
    const datas = await productsModel.updateProductImage(
      urlImage,
      params.productId
    );
    res.status(200).json({
      data: datas.rows,
      msg: "Update Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateProductWithPromo = async (req, res) => {
  try {
    const { body, params } = req;
    await productsModel.updateProduct(
      {
        product_name: body.product_name,
        price: body.price,
        category_id: body.category_id,
        desc: body.desc,
      },
      params
    );
    // const id = result.rows[0].id;
    const { data, err, msg } = await uploader(req, "product", params.productId);
    if (err) throw { msg, err };
    if (!data) return res.status(200).json({ msg: "No File Uploaded" });
    const urlImage = data.secure_url;
    const datas = await productsModel.updateProductImage(
      urlImage,
      params.productId
    );
    const promo = await promoModel.updatePromo(
      { discount: body.discount, expired: body.expired },
      params
    );
    res.status(200).json({
      data: datas.rows,
      promo: promo.rows,
      msg: "Update Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { params } = req;
    const result = await productsModel.deleteProduct(params);
    res.status(200).json({
      data: result.rows,
      msg: "Delete Success",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getProducts,
  insertProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
  insertProductPromo,
  getProductDetailWithPromo,
  updateProductWithPromo,
};
