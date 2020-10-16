const { Router } = require('express');
const { check } = require('express-validator');
const error = require('../middleware/errorMiddleware');
const auth = require('../middleware/authMiddleware');
const router = Router();
const { registerUser, loginUser } = require('../controllers/auth_controller');
const {
  generateTodo,
  getTodos,
  getTodo
} = require('../controllers/todo_controller');

router.post(
  '/api/auth/register',
  [
    check('email', 'Please enter email')
      .exists({ checkFalsy: true }).bail()
      .normalizeEmail().isEmail()
      .withMessage('Incorrect email'),
    check('password', 'Please enter password')
      .exists({ checkFalsy: true }).bail()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/\d/)
      .withMessage('Password must contain at least one number'),
  ],
  error,
  registerUser,
);

router.post(
  '/api/auth/login',
  [
    check('email', 'Please enter your email')
      .exists({ checkFalsy: true }).bail()
      .normalizeEmail().isEmail()
      .withMessage('Invalid email'),
    check('password', 'Please enter password')
      .exists({ checkFalsy: true }).bail(),
  ],
  error,
  loginUser,
);

router.post(
  '/api/todo/generate',
  [
    check('date', 'Please enter a date')
      .exists({ checkFalsy: true }).bail()
      .isISO8601().toDate(),
    check('time', 'Please enter time')
      .exists({ checkFalsy: true }).bail()
      .matches(/^(?:\d|[01]\d|2[0-3]):[0-5]\d$/)
      .withMessage('Incorrect time'),
    check('name', 'Please enter a name')
      .exists({ checkFalsy: true }).bail()
      .isLength({ min: 3 })
      .withMessage('Name must be at least 3 characters')
      .trim(),
    check('description', 'Please enter a description')
      .exists({ checkFalsy: true }).bail()
      .isLength({ min: 5 })
      .withMessage('Description must be at least 5 characters')
      .trim(),
  ],
  auth,
  error,
  generateTodo,
);

router.get('/api/todo/', auth, getTodos);

router.get('/api/todo/:id', auth, getTodo);

module.exports = router;
