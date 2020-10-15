const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const { installHandler } = require('./api_handler');
const { connectToDatabase } = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  console.log('Server running in production mode');
} else {
  console.log('Server running in development mode');
}

//mount graphql
installHandler(app);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(__dirname, '../frontend/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.send('<h1>NOT FOUND 404<h1>');
  });
}

const port = process.env.PORT || 3001;
(async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR on starting server: ', err);
  }
})();
