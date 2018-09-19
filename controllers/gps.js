const GPS = require('../models/GPS');

class GPSController {
  constructor() {
  }

  static create (req, res) {
    const {
      type,
      long,
      lat
    } = req.body;
    
    GPS.create({
      location: {
        type: { type },
        coordinates: [long, lat]
      }

    })
      .then(newGPS => {
        res.status(200).json(newGPS);
      })
      .catch (err => {
        res.status(400).json({
          error: err.message})
      })
  }

  static getGPSById (req, res) {
    let GPSId = req.params.id;

    GPS.findById (GPSId)
      .then(GPSFound => {
        if(GPSFound){
          res.status(200).json(GPSFound)
        } else {
          res.status(404).json({
            error: 'GPS not found'
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static getAllGPS (req, res) {
    GPS.find ()
      .then(GPS => {
        res.status(200).json(GPS)
      })
      .catch(err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static update (req, res) {
    let GPSId = req.params.id;

    GPS.findByIdAndUpdate(GPSId, {$set: req.body}, {new:true})
      .then( updatedGPS => {
        res.status(200).json(updatedGPS)
      })
      .catch( err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static remove (req, res) {
    let GPSId = req.params.id;

    GPS.findByIdAndRemove(GPSId)
      .then( removedGPS => {
        res.status(200).json(removedGPS)
      })
      .catch( err => {
        res.status(400).json({
          error: err.message
        })
      })
  }
}

module.exports = GPSController
