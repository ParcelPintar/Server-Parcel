const Parcel = require('../models/ParcelPintar');

class ParcelController {
  constructor() {
  }

  static create (req, res) {
    const {
      gyro,
      gps
    } = req.body;
    
    Order.create({
      gyro,
      gps
    })
      .then(newParcel => {
        res.status(200).json(newParcel);
      })
      .catch (err => {
        res.status(400).json({
          error: err.message})
      })
  }

  static getParcelById (req, res) {
    let parcelId = req.params.id;

    Parcel.findById (parcelId)
      .then(parcelFound => {
        if(parcelFound){
          res.status(200).json(parcelFound)
        } else {
          res.status(404).json({
            error: 'Parcel not found'
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static getAllParcels (req, res) {
    Parcel.find ()
      .then(parcels => {
        res.status(200).json(parcels)
      })
      .catch(err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static updateParcel (req, res) {
    let parcelId = req.params.id;

    Parcel.findByIdAndUpdate(parcelId, {$set: req.body}, {new:true})
      .then( updatedParcel => {
        res.status(200).json(updatedParcel)
      })
      .catch( err => {
        res.status(400).json({
          error: err.message
        })
      })
  }

  static remove (req, res) {
    let parcelId = req.params.id;

    Parcel.findByIdAndRemove(parcelId)
      .then( removedParcel => {
        res.status(200).json(removedParcel)
      })
      .catch( err => {
        res.status(400).json({
          error: err.message
        })
      })
  }
}

module.exports = ParcelController
