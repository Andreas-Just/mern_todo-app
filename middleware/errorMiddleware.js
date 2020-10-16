const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {

    const message = error.array()
      .reduce((arr, { msg }) => {
        if (msg) arr.push(msg);

        return arr;
      }, []);

    return res.status(400).json({ error: error.array(), message });
  }

  next();
};
