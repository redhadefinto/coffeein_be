const db = require("../configs/postgre");

const transactionModel = require('../models/transactions.model');

// create transaction
// 1. insert ke transaction
// 2, insert detail

const createTransaction = async (req, res) => {
  const { authInfo, body } = req;
  // res.status(200).json({
  //   ...body
  // })
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const result = await transactionModel.createTransaction(client, body, authInfo.id);
    const transactionId = result.rows[0].id;
    await transactionModel.createDetailTransaction(client, body, transactionId);
    await client.query("COMMIT");
    const transactionWithDetail = await transactionModel.getTransaction(client, transactionId);
    client.release();
    res.status(200).json({
      data: transactionWithDetail.rows,
      msg: "OK"
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    client.release();
    res.status(500).json({
      msg: "Internal Server Error"
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const { id } = req.authInfo;
    // console.log(id)
    const result = await transactionModel.getHistory(id);
    // console.log(result)
    res.status(200).json({
      data: result.rows,
      msg: 'ok'
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error"
    });
  }
} ;
const getDetailHistory = async (req, res) => {
  try {
    const { id } = req.authInfo;
    const {body} = req;
    // console.log(id)
    const result = await transactionModel.getDetailHistory(
      id,
      body.tpsId
    );
    // console.log(result)
    res.status(200).json({
      data: result.rows,
      msg: 'ok'
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error"
    });
  }
};
const deleteHistory = async (req, res) => {
  try {
    const { id } = req.authInfo;
    const {body} = req;
    // console.log(id)
    const result = await transactionModel.deleteHistory(
      id,
      body.tpsId
    );
    // console.log(result)
    res.status(200).json({
      data: result.rows,
      msg: 'ok'
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error"
    });
  }
};




module.exports = { createTransaction, getHistory, deleteHistory, getDetailHistory };
