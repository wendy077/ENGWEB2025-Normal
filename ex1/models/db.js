// models/db.js
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'eurovisao';

let db = null;

const connectDB = async () => {
  if (db) return db;
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
  console.log("Conectado à base de dados");
  return db;
};

module.exports = { connectDB };
