import React, { useEffect, useState } from 'react';

const Epic = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_KEY}`;

    
    
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        
        setData(apiData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false); 
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.length) {
    return <div>Error: Unable to fetch data.</div>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center w-full h-full p-4 overflow-hidden bg-black text-white">
      {data.map((item) => {
        const { image, caption, date, identifier } = item;
        const [year, month, day] = date.split(' ')[0].split('-'); 
        const baseURL = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/`;
        const imageURL = `${baseURL}${image}.png`;

        return (
          <div key={identifier} className="w-full max-w-screen-md bg-black text-white rounded-lg flex flex-col items-center justify-center overflow-hidden m-4 border-2 border-white ">
            <img 
              src={imageURL}
              alt={caption || 'EPIC Image of the Day'}
              className="w-full object-cover rounded-md"
            />
            <article className="w-full p-4">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">
                EPIC Image - {date}
              </h3>
              <p className="text-lg md:text-xl text-center">{caption}</p>
              <p className="text-sm text-center mt-2">Identifier: {identifier}</p>
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default Epic;
