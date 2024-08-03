import React, { useState } from 'react';

const NeoWs = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [asteroids, setAsteroids] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAsteroids = async () => {
        setLoading(true);
        setError(null);

        // Validate date range
        if (!startDate || !endDate) {
            setError('Please select both start and end dates.');
            setLoading(false);
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 7) {
            setError('The date range must be within 7 days.');
            setLoading(false);
            return;
        }

        const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_KEY}`;

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();

            // Log the data to check its structure
            console.log(data);

            const allAsteroids = Object.values(data.near_earth_objects).flat();
            setAsteroids(allAsteroids);
        } catch (err) {
            setError('Error fetching data. Please check your date range and try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatMissDistance = (distance) => {
        return distance ? parseFloat(distance.kilometers).toFixed(2) : 'N/A';
    };

    const formatVelocity = (velocity) => {
        return velocity ? parseFloat(velocity).toFixed(2) : 'N/A';
    };

    return (
        <div className="p-4 bg-black rounded-lg min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Asteroids - NeoWs</h1>
            
            <div className="max-w-md mx-auto p-10 bg-black border-2   shadow-md border-white rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-white-900 text-center">Search for Asteroids</h2>
                <div className="mb-4">
                    <label htmlFor="start-date" className="block text-white mb-2">Start Date:</label>
                    <input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="end-date" className="block text-white mb-2">End Date:</label>
                    <input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black"
                    />
                </div>
                <button
                    onClick={fetchAsteroids}
                    className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                    Search
                </button>
            </div>

            {loading && <p className="text-center mt-4 text-gray-700">Loading...</p>}
            {error && <p className="text-center mt-4 text-red-600">{error}</p>}
            
            <div className="mt-6 max-w-4xl mx-auto">
                {asteroids.length > 0 ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-white text-center">Asteroid Results</h2>
                        <div className="space-y-4">
                            {asteroids.map((asteroid) => (
                                <div key={asteroid.id} className="bg-grey-100 p-4 shadow-md rounded-lg border-white border-2 ">
                                    <h3 className="text-xl font-bold mb-2 text-white-900">{asteroid.name}</h3>
                                    <p className="text-white-700 mb-2"><strong>Estimated Diameter:</strong> {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
                                    <p className="text-white-700 mb-2"><strong>Close Approach Date:</strong> {asteroid.close_approach_data[0]?.close_approach_date || 'N/A'}</p>
                                    <p className="text-white-700 mb-2"><strong>Miss Distance:</strong> {formatMissDistance(asteroid.close_approach_data[0]?.miss_distance)} km</p>
                                    <p className="text-white-700 mb-2"><strong>Relative Velocity:</strong> {formatVelocity(asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_hour)} km/h</p>
                                    <a href={asteroid.nasa_jpl_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">More Info</a>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    !loading && <p className="text-center mt-4 text-gray-600">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default NeoWs;
