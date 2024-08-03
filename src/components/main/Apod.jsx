import React, { useEffect, useState } from 'react';

const Apod = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date().toDateString();
  
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
      const localKey = `NASA-${today}`;

      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(url);
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    }
    fetchAPIData();
  }, [today]);

  if (loading) {
    return <div className="flex items-center justify-center w-full h-screen bg-black text-white">Loading...</div>;
  }

  if (!data) {
    return <div className="flex items-center justify-center w-full h-screen bg-black text-white">Error: Unable to fetch data.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-black p-4 overflow-hidden" >
      <div className="w-full max-w-screen-md h-full bg-black text-white rounded-lg flex flex-col items-center justify-center overflow-hidden">
        <img 
          src={data.hdurl}
          alt={data.title || 'Astronomy Picture of the Day'}
          className="w-full max-h-3/4 object-cover rounded-md"
        />
        <article className="w-full p-4 overflow-y-auto">
          <h3 className='text-2xl md:text-3xl font-bold text-center mb-4'>
            {data.title} <span className='text-lg md:text-xl'>{today}</span>
          </h3>
          <p className="text-lg md:text-xl text-center">{data.explanation}</p>
        </article>
      </div>
    </div>
  );
};

export default Apod;
