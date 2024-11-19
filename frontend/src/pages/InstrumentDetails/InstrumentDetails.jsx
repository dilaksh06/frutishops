import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './InstrumentDetails.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const InstrumentDetails = () => {
    const url = "http://localhost:5000"
    const { id } = useParams(); // Extract the id from the URL
    const [instrument, setInstrument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInstrument = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await axios.get(`${url}/api/instruments/${id}`);
                console.log(response.data);
                setInstrument(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch instrument details.');
                setLoading(false);
                toast.error('Failed to fetch instrument details.');
            }
        };

        fetchInstrument();
    }, [id, url]);

    if (loading) {
        return <div className="instrument-details"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="instrument-details"><p>{error}</p></div>;
    }

    return (
        <div className="instrument-details">
            <div className="instrument-header">
                <h1>{instrument.name}</h1>
                <p className="instrument-category">{instrument.category}</p>
            </div>

            <div className="instrument-body">
                <div className="instrument-image">
                    <img src={`${url}/images/${instrument.image}`} alt={instrument.name} /> {/* Updated */}
                </div>

                <div className="instrument-info">
                    <p><strong>Type/Category:</strong> {instrument.type}</p>
                    <p><strong>Country of Origin:</strong> {instrument.country}</p>
                    <p><strong>Materials Used:</strong> {instrument.material}</p>
                    <p><strong>Musical Genre:</strong> {instrument.genre}</p>
                    <p><strong>Description:</strong> {instrument.description}</p>
                    <p><strong>Price:</strong> ${instrument.price}</p>
                </div>
            </div>

            <div className="instrument-audio">
                <h3>Listen to the Sound:</h3>
                <audio controls>
                    <source src={`${url}/images/${instrument.audio}`} type="audio/mpeg" /> {/* Updated */}
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
    );

};

export default InstrumentDetails;
