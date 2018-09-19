const Gyro = require('../models/GPS');

class GyroController {
  constructor() {
  }

  static create (req, res) {
    const {
      threshold
    } = req.body;
    
    Gyro.create({
      threshold
    })
      .then(newGyro => {
        res.status(200).json(newGyro);
      })
      .catch (err => {
        res.status(400).json({
          error: err.message})
      })
  }

  static getGyroById (req, res) {
    let GyroId = req.params.id;

    Gyro.findById (GyroId)
      .then(GyroFound => {
        if(GyroFound){
          res.status(200).json(GyroFound)
        } else {
          res.status(404).json({
            error: 'Gyro not found'
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static getAllGyro (req, res) {
    Gyro.find ()
      .then(Gyro => {
        res.status(200).json(Gyro)
      })
      .catch(err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static updateGyro (req, res) {
    let GyroId = req.params.id;

    Gyro.findByIdAndUpdate(GyroId, {$set: req.body}, {new:true})
      .then( updatedGyro => {
        res.status(200).json(updatedGyro)
      })
      .catch( err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static remove (req, res) {
    let GyroId = req.params.id;

    Gyro.findByIdAndRemove(GyroId)
      .then( removedGyro => {
        res.status(200).json(removedGyro)
      })
      .catch( err => {
        res.status(400).json({
          error: err.message
        })
      })
  }
}

module.exports = GyroController
