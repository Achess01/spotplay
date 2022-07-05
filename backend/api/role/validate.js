import { body } from 'express-validator'
import { resultHandler } from '../middlewareHandler.js'

export const validateCreate = [
  body('name')
    .exists()
    .withMessage('Expected: name')
    .bail()
    .isLength({ min: 3 })
    .withMessage('name should be at least 3 characters'),
  body('description')
    .exists()
    .withMessage('Expected: description')
    .bail()
    .isLength({ min: 10 })
    .withMessage('description should be at least 10 characters'),
  resultHandler
]

export const validateUpdate = [
  body(['_username', '_email', '_password']).exists(),
  resultHandler
]
