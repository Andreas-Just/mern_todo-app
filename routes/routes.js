const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { registerUser, loginUser } = require('../controllers/auth_controller');

router.post(
  '/api/auth/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Please enter password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/\d/)
      .withMessage('Password must contain at least one number'),
  ],
  registerUser,
);

router.post(
  '/api/auth/login',
  [
    check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Please enter password').exists(),
  ],
  loginUser,
);

// router.get('/api/recipe', getRecipe => controller => function);

module.exports = router;
