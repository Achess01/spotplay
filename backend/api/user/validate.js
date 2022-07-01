import { response } from '../../response/response.js'
/* import expressValidator from 'express-validator'

const check = expressValidator.check
const validationResult = expressValidator.validationResult
export const validateCreateUser = [
  check('username')
    .isLength({ min: 3 })
    .exists()
    .withMessage('Name should be alleast 3 characters'),
  check('email')
    .exists()
    .isEmail()
    .withMessage('Password should be alleast 6 characters'),
  check('password')
    .isLength({ min: 6 })
    .exists()
    .withMessage('Password should be alleast 6 characters')
] */

export const checkUser = (req, res, next) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return response.error(req, res, 'Please enter all fields', 400)
    }
    if (username.length < 3) {
      return response.error(
        req,
        res,
        'username should be at least 3 characters',
        400
      )
    }
    if (password.length < 6) {
      return response.error(
        req,
        res,
        'password should be at least 6 characters',
        400
      )
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return response.error(req, res, 'Please enter a valid email', 400)
    }
    next()
  } catch (error) {
    return response.error(req, res, 'Something went wrong', 500)
  }
}
