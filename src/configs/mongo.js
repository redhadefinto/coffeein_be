const { mongoPass } = require('../configs/environment');

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://admin-coffe:${mongoPass}@coffe-shop.kgssdme.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = {
  client, 
  comments: client.db("sample_mflix").collection("comments"),
  error: client.db('log').collection('error')
};
