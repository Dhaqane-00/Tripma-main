import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TripAdmin.css";

const AdminTrip = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const res = await axios.get("http://localhost:3000/trip/GetAllsearch");
      console.log(res.data); // Log the response to the console
      setTrips(res.data.data); // Update setTrips to use res.data.data
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };
  
  

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (trip) => {
    try {
      const tripId = trip.id; // Make sure to use the correct property name for the id
      setTrips(trips.filter((t) => t.id !== tripId));
      await axios.delete(`http://localhost:3000/trip/DeleteTrip/${tripId}`);
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };
  

  return (
    <div className="trips">
      <div className="container">
        <button
          onClick={() => navigate("/trip/new")}
          className="btn btn-primary mb-4"
        >
          New Trip
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Adult</th>
              <th>Minor</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip._id}>
                <td> {trip.departure} </td>
                <td> {trip.arrival} </td>
                <td> {trip.startDate} </td>
                <td> {trip.endDate} </td>
                <td> {trip.adult} </td>
                <td> {trip.minor} </td>
                <td>
                  <button
                    onClick={() => navigate(`/trip/${trip.id}`)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(trip)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTrip;
