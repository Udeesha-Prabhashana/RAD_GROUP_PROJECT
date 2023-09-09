import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room({
    room_No: req.body.room_No,
    room_type: req.body.room_type,
    room_ac: req.body.room_ac,
    price: req.body.price,
    availability: req.body.availability,
    no_of_beds: req.body.no_of_beds,
    no_of_chairs: req.body.no_of_chairs,
    tv: req.body.tv,
    bathroom: req.body.bathroom,
    balcony: req.body.balcony,
    wifi: req.body.wifi,
  });

  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been delete");
  } catch (err) {
    next(err);
  }
};


export const getRooms = async (req, res, next) => {
  try {
    const Rooms = await Room.find();
    res.status(200).json(Rooms);
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

