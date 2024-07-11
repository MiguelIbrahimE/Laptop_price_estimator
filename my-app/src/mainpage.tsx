import React, { useState } from 'react';

const MainPage: React.FC = () => {
  const [cpu, setCpu] = useState('');
  const [gpu, setGpu] = useState('');
  const [ram, setRam] = useState('');
  const [ssd, setSsd] = useState('');
  const [make, setMake] = useState('');
  const [price, setPrice] = useState<number | null>(null);

  const handleGeneratePrice = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cpu, gpu, ram, ssd, make })
      });
      const data = await response.json();
      setPrice(data.price);
    } catch (error) {
      console.error('Error generating price:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Laptop Price Estimator</h1>
      <p>Fill in the details of your laptop to get an estimated price.</p>
      <form onSubmit={(e) => { e.preventDefault(); handleGeneratePrice(); }}>
        <div>
          <label>CPU: </label>
          <input type="text" value={cpu} onChange={(e) => setCpu(e.target.value)} required />
        </div>
        <div>
          <label>GPU: </label>
          <input type="text" value={gpu} onChange={(e) => setGpu(e.target.value)} required />
        </div>
        <div>
          <label>RAM: </label>
          <input type="text" value={ram} onChange={(e) => setRam(e.target.value)} required />
        </div>
        <div>
          <label>SSD: </label>
          <input type="text" value={ssd} onChange={(e) => setSsd(e.target.value)} required />
        </div>
        <div>
          <label>Make of the Laptop: </label>
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
        </div>
        <button type="submit">Generate Price</button>
      </form>
      {price && (
        <div>
          <h2>Estimated Price: ${price}</h2>
          <p>Please note: This is a scam price!</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
