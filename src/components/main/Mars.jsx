import React, { useEffect, useState } from 'react';

const Mars = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(20);

  useEffect(() => {
    const fetchImages = async () => {
      const NASA_KEY = 'DEMO_KEY'; // Replace with your actual NASA API key if needed
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_KEY}`
      );
      const json = await response.json();
      setData(json.photos);
      setLoading(false);
    };

    fetchImages();
  }, []);

  const loadMoreImages = () => {
    setDisplayCount(displayCount + 40);
  };

  return (
    <div className="p-4 bg-black rounded-lg min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Mars Rover Images
      </h1>

      {loading && <div className="text-white text-center">Loading...</div>}
      {!loading && !data.length && (
        <div className="text-white text-center">No images found.</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.filter(photo => photo.id % 2 !== 0).slice(0, displayCount).map((photo) => (
          <div key={photo.id} className="bg-black rounded-lg shadow-lg border-white border-2">
            <img
              src={photo.img_src}
              alt={photo.camera.full_name}
              className="w-full h-64 object-cover rounded-t-md"
            />
            <div className="mt-2 p-2 bg-black rounded-b-md text-center">
              <h3 className="text-white text-lg font-semibold mb-2">
                {photo.camera.full_name}
              </h3>
              <p className="text-white"><span className="font-bold">ID:</span> {photo.id}</p>
              <p className="text-white"><span className="font-bold">Sol:</span> {photo.sol}</p>
              <p className="text-white"><span className="font-bold">Date:</span> {photo.earth_date}</p>
              <p className="text-white"><span className="font-bold">Rover:</span> {photo.rover.name}</p>
              <p className="text-white"><span className="font-bold">Landing Date:</span> {photo.rover.landing_date}</p>
              <p className="text-white"><span className="font-bold">Launch Date:</span> {photo.rover.launch_date}</p>
              <p className="text-white"><span className="font-bold">Max Sol:</span> {photo.rover.max_sol}</p>
              <p className="text-white"><span className="font-bold">Max Date:</span> {photo.rover.max_date}</p>
              <p className="text-white"><span className="font-bold">Status:</span> {photo.rover.status}</p>
            </div>
          </div>
        ))}  
      </div>
      {displayCount < data.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreImages}
            className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Mars;
