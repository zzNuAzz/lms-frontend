require('dotenv').config();

const { MongoClient } = require('mongodb');

let database;

async function connectToDatabase() {
  const url = process.env.DB_URL || 'mongodb://localhost/WEB_INT330';

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log(`Connected to MongoDB ${url}`);
  database = client.db();
}

function getDB() {
  return database;
}

module.exports = { getDB, connectToDatabase };
