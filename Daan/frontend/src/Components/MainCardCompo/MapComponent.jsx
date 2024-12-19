import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MapComponent = ({ locationName, zoom = 13 }) => {
  const [latLng, setLatLng] = useState({ lat: -33.8688, lng: 151.2195 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLatLng = async (location) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://maps.gomaps.pro/maps/api/geocode/json`,
        {
          params: {
            address: location,
            key: 'AlzaSyg2ZsvRWOu12bDuuYGKUK_Pculi6DBIwXr', // Replace with your actual GoMap API key
          },
        }
      );
      const data = response.data;

      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        console.log('Latitude and Longitude:', lat, lng);
        setLatLng({ lat, lng });
      } else {
        setError('Location not found');
      }
    } catch (err) {
      setError('Failed to fetch location');
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchLatLng(locationName);
  }, [locationName]);

  const mapImageUrl = `https://maps.gomaps.pro/maps/api/staticmap?center=${latLng.lat},${latLng.lng}&zoom=${zoom}&size=600x300&markers=${latLng.lat},${latLng.lng}&key=AlzaSyg2ZsvRWOu12bDuuYGKUK_Pculi6DBIwXr`;

  return (
    <div style={{ width: '100%', height: '300px', position: 'relative' }}>
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f8f8',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '5px solid #ddd',
              borderTop: '5px solid #007bff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        <img
          src={mapImageUrl}
          alt="Map"
          key={mapImageUrl} // Unique key to force image reload
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default MapComponent;
