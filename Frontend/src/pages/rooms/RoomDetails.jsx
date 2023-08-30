// RoomDetails.jsx
import React from "react";
import useFetch from "../../hooks/useFetch";

const RoomDetails = ({ id }) => {
    const { data, loading, error } = useFetch(`http://localhost:8880/api/room/${id}`);
    
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!data) {
        return null;
    }

    return (
        <div>
            <p>All Details:</p>
            <p>Room Number: {data.room_No}</p>
            <p>Room Type: {data.room_type}</p>
            <p>AC Availability: {data.room_ac}</p>
            <p>Price Per Night: {data.price}</p>
            <p>Room Availability: {data.availability}</p>
            <p>Number of Beds: {data.no_of_beds}</p>
            <p>Number of Chairs: {data.no_of_chairs}</p>
            <p>TV: {data.tv}</p>
            <p>Bathroom: {data.bathroom}</p>
            <p>Balcony: {data.balcony}</p>
            <p>wifi: {data.room_wifi}</p>
        </div>
    );
};

export default RoomDetails;
