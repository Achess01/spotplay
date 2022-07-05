import { body } from 'express-validator'
import { resultHandler } from '../middlewareHandler.js'

export const validateCreate = [
  body('title')
    .exists()
    .withMessage('Expected: title')
    .bail()
    .isLength({ min: 3 })
    .withMessage('title should be at least 3 characters'),
  body('uri')
    .exists()
    .withMessage('Expected: uri')
    .bail()
    .isURL()
    .withMessage('Wrong uri format'),
  body('duration')
    .exists()
    .withMessage('Expected: duration')
    .bail()
    .isLength({ min: 3 })
    .withMessage('duration should be at least 3 characters'),
  body('image')
    .exists()
    .withMessage('Expected: image')
    .bail()
    .isURL()
    .withMessage('Wrong image format'),
  body('idArtist')
    .exists()
    .withMessage('Expected: idArtist')
    .bail()
    .isInt()
    .withMessage('idArtist should be a number'),
  body('idGenre')
    .exists()
    .withMessage('Expected: idGenre')
    .bail()
    .isInt()
    .withMessage('idGenre should be a number'),
  resultHandler
]

export const validateUpdate = [
  body(['_username', '_email', '_password']).exists(),
  resultHandler
]
