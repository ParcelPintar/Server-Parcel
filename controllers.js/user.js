const User = require('../models/User');
const AuthHelper = require('../helpers/authHelper');

class UserController {
  constructor() {}

  static signup (req, res) {
    const {
      name,
      email,
      password
    } = req.body;

    User.create({
      name,
      email,
      password
    })
      .then (newUser => {
        res.status(200).json(newUser);
      })
      .catch (err => {
        res.status(400).json({
          error: err.message})
      })
  }

  static login (req, res) {
    const {
      email,
      password
    } = req.body;
    
    User.findOne({email})
      .then(userFound => {
        let passwordIsMatch = AuthHelper.comparehash(password, userFound.password);
        if (passwordIsMatch) {
          let token = AuthHelper.createToken({
            id: String(userFound._id),
            name: userFound.name,
            email: userFound.email
          })

          res.status(200).json({
            token
          })
        } else {
          res.status(404).json({
            error: 'User not registered'
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          error: err.message
        })
      })
  }
}

module.exports = UserController
