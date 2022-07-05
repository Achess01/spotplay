import { body } from 'express-validator'
import { resultHandler } from '../middlewareHandler.js'

export const validateCreate = [
  body('firstName')
    .exists()
    .withMessage('Expected: firstName')
    .bail()
    .isLength({ min: 3 })
    .withMessage('firstName should be at least 3 characters'),
  body('lastName')
    .exists()
    .withMessage('Expected: lastName')
    .bail()
    .isLength({ min: 3 })
    .withMessage('lastName should be at least 3 characters'),
  body('avatarUri')
    .exists()
    .withMessage('Expected: avatarUri')
    .bail()
    .isURL()
    .withMessage('Wrong avatarUri format'),
  resultHandler
]

export const validateUpdate = [
  body(['_username', '_email', '_password']).exists(),
  resultHandler
]
