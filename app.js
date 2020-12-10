const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { mongoUri } = require('./config/config');

const app = express();

app.use(express.json({ extended: true }));
app.use(require('./routes/routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile((path.resolve(__dirname, 'client', 'build', 'index.html')));
  });
}

const PORT = process.env.PORT || 5000;

const start = async() => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`Server is running on the port: ${PORT}`));
  } catch (err) {
    console.log('Server Error: ', err.message);
    process.exit(1);
  }
};

start();
