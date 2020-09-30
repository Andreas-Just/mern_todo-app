const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));
app.use(require('./routes/routes'));

const PORT = process.env.PORT || 5000;

const start = async() => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
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

// to be continues 1:46:00