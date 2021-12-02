const mongoose = require('mongoose');

if (process.env.NODE_ENV == 'development') {
  url = process.env.DB_DEV
} else {
  url = process.env.DB_PRODUCTION
}

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

db = mongoose.connection;

db.on("error", console.error.bind(console, 'CONNECTION ERROR!!'))

db.once('open', () => {
  console.log('DB CONNECTED');
});