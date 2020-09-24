const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
// const { getRecipe, createRecipe, deleteRecipe, modifyRecipe } = require('../controllers/recipe_controller');
const { registerUser, loginUser } = require('../controllers/auth_controller');

router.post(
  '/api/auth/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'The minimum password length is 8 characters')
      .isLength({ min: 6 }),
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
