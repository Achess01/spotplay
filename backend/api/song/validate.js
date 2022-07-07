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
    .isLength({ min: 24 })
    .withMessage('idArtist should be at least 24 characters'),
  body('idGenre')
    .exists()
    .withMessage('Expected: idGenre')
    .bail()
    .isLength({ min: 24 })
    .withMessage('idGenre should be at least 24 characters'),
  resultHandler
]

export const validateUpdate = [
  body(['_username', '_email', '_password']).exists(),
  resultHandler
]
