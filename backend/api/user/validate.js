import { body } from 'express-validator'
import { resultHandler } from '../middlewareHandler.js'

export const validateCreateUser = [
  body('username')
    .exists()
    .withMessage('Expected: username')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name should be at least 3 characters'),
  body('email')
    .exists()
    .withMessage('Expected: email')
    .bail()
    .isEmail()
    .withMessage('Wrong email format'),
  body('password')
    .exists()
    .withMessage('Expected: password')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters'),
  body('roleId').optional().isLength({ min: 24 }).withMessage('roleId should be at least 24 characters'),
  resultHandler
]

export const validateUpdate = [
  body(['_username', '_email', '_password']).exists(),
  resultHandler
]
