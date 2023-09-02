import Booking from "../models/bookingModel.js";
import Room from "../models/Room.js";

export const getBookings = async (req, res, next) => {
    //res.json({mssg: 'getBookings is working'}) 
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }  
};

export const getBooking = async (req, res, next) => {
    //res.json({mssg: 'getBooking is working'})
    try {
        const booking = await Booking.findById(req.params.id);
        res.status(200).json(booking);
    } catch (err) {
        next(err);
    }
};

export const createBooking = async (req, res, next) => {
    //res.json({mssg: 'createBooking is working'})
    const newBooking = new Booking(req.body);

    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (err) {
        next(err);
    }
};

export const updateBookin = async (req, res, next) => {
    //res.json({mssg: 'updateBookin is working'})
    const newBooking = new Booking(req.body);
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedBooking);
    } catch (err) {
        next(err);
    }
};

export const deleteBooking = async (req, res, next) => {
    //res.json({mssg: 'deleteBooking is working'})
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking has been delete");
    } catch (err) {
        next(err);
    }
}

export const searchAvailableRooms = async (req, res, next) =>{
    try {
        const { checkInDate, checkOutDate, capacity } = req.body;
    
        // Perform a search for available room combinations based on the provided parameters
        // You'll need to implement the logic for this search, considering room availability and capacity
        function isRoomAvailable(room, checkInDate, checkOutDate) {
            // Check if the room is available for the specified date range
            for (const booking of Bookings) {///////////
              if (
                booking.roomId === room._id &&
                checkInDate < booking.checkOutDate &&
                checkOutDate > booking.checkInDate
              ) {
                return false; // Room is already booked for this date range
              }
            }
            return true;
        }
          
          function findRoomCombinations(desiredCapacity, checkInDate, checkOutDate) {
            // Filter rooms by capacity and availability for the specified date range
            const availableRooms = Room.filter((room) => {//////////////////////////////////////
              return room.capacity >= desiredCapacity && isRoomAvailable(room, checkInDate, checkOutDate);
            });
          
            const roomCombinations = [];
            const currentCombination = [];
          
            function generateCombinations(startIndex, currentCapacity) {
              if (currentCapacity >= desiredCapacity) {
                // Add the current combination to the result
                roomCombinations.push([...currentCombination]);
                return;
              }
          
              for (let i = startIndex; i < availableRooms.length; i++) {
                const room = availableRooms[i];
          
                // Add the room to the current combination
                currentCombination.push(room);
          
                // Recursively generate combinations
                generateCombinations(i + 1, currentCapacity + room.capacity);
          
                // Remove the last added room to explore other combinations
                currentCombination.pop();
              }
            }
          
            // Start generating combinations from the first room
            generateCombinations(0, 0);
          
            return roomCombinations;
          }
    
        res.json(findRoomCombinations(capacity, checkInDate, checkOutDate));
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

