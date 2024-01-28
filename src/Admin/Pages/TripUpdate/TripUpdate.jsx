import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TripUpdate.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TripUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trip, setTrip] = useState({
    departure: "",
    arrival: "",
    startDate: "",
    endDate: "",
    adult: 0,
    minor: 0,
  });

  const apiUrl = "http://localhost:3000/trip";

  useEffect(() => {
    
    if (!id || id === "new") return;
    const fetchTrip = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/getTrip/${id}`);
        setTrip(data.data);
        console.log("Trip data:", data);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };
  
    fetchTrip();
  }, [id, apiUrl]);
  
//Convert input to number Fields On adult and minor
  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.name === "adult" || e.target.name === "minor"
        ? Number(e.target.value)  // Convert input to number
        : e.target.value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id === "new") {
        await axios.post(`${apiUrl}/search`, trip);
        toast.success("Post successful")
      } else {
        await axios.put(`${apiUrl}/Updatesearch/${id}`, trip);
        toast.success("Update successful")
      }
      
      navigate("/Admin");
    } catch (error) {
      console.error("Error submitting trip:", error);
      toast.error("Failed to submit trip:", error);
    }
  };


  return (
    <div className="post__wrapper">
      <div className="container">
        <form className="post">
          <input
            type="text"
            placeholder="Departure..."
            name="departure"
            value={trip.departure}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Arrival"
            name="arrival"
            value={trip.arrival}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Start Date..."
            name="startDate"
            value={trip.startDate}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="End Date..."
            name="endDate"
            value={trip.endDate}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Adults..."
            name="adult"
            value={trip.adult}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Minors..."
            name="minor"
            value={trip.minor}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            {id === "new" ? "Post" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TripUpdate;
