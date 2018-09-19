const User = require('../models/User');
const AuthHelper = require('../helpers/authHelper');

class UserController {
  constructor() {}

  static register (req, res) {
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

  static update (req, res) {
    let userId = req.params.id;

    User.findByIdAndUpdate(userId, {$set: req.body}, {new:true})
      .then( updatedUser => {
        res.status(200).json(updatedUser)
      })
      .catch( err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static remove (req, res) {
    let userId = req.params.id;

    User.findByIdAndRemove(userId)
      .then( removedUser => {
        res.status(200).json(removedUser)
      })
      .catch( err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static getUser (req, res) {
    const {email} = req.body

    User.findOne (email)
      .populate('orders')
      .populate('receivers')
      .then(userFound => {
        if(userFound){
          res.status(200).json(userFound)
        } else {
          res.status(404).json({
            error: 'User not found'
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
