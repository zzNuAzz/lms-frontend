// let testMessage = 'Test graphql bla bla';
const { getDB } = require('./db');

async function getTestMessage() {
  const db = getDB();
  const { message } = await db.collection('test').findOne({});
  return message;
}

async function setTestMessage(_, { message }) {
  const db = getDB();
  await db.collection('test').findOneAndUpdate({}, { $set: { message } });

  const current = await db.collection('test').findOne({});
  return current.message;
}
module.exports = {
  getTestMessage,
  setTestMessage,
};
