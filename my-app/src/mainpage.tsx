import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { cpus } from './cpuList';
import { gpus } from './gpuList'; // Ensure this import is correct

const MainPage: React.FC = () => {
  const [cpu, setCpu] = useState('');
  const [gpu, setGpu] = useState('');
  const [ram, setRam] = useState('');
  const [ssd, setSsd] = useState('');
  const [make, setMake] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [cpuSuggestions, setCpuSuggestions] = useState<string[]>([]);
  const [gpuSuggestions, setGpuSuggestions] = useState<string[]>([]);

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

  const onCpuSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setCpuSuggestions(getCpuSuggestions(value));
  };

  const onCpuSuggestionsClearRequested = () => {
    setCpuSuggestions([]);
  };

  const getCpuSuggestions = (value: string): string[] => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : cpus.filter(cpu =>
      cpu.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const onGpuSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setGpuSuggestions(getGpuSuggestions(value));
  };

  const onGpuSuggestionsClearRequested = () => {
    setGpuSuggestions([]);
  };

  const getGpuSuggestions = (value: string): string[] => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : gpus.filter(gpu =>
      gpu.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const getSuggestionValue = (suggestion: string) => suggestion;

  const renderSuggestion = (suggestion: string) => (
    <div>
      {suggestion}
    </div>
  );

  const onCpuChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
    setCpu(newValue);
  };

  const onGpuChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
    setGpu(newValue);
  };

  const cpuInputProps = {
    placeholder: 'Type a CPU model',
    value: cpu,
    onChange: onCpuChange
  };

  const gpuInputProps = {
    placeholder: 'Type a GPU model',
    value: gpu,
    onChange: onGpuChange
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Laptop Price Estimator</h1>
      <p>Fill in the details of your laptop to get an estimated price.</p>
      <form onSubmit={(e) => { e.preventDefault(); handleGeneratePrice(); }}>
        <div>
          <label>CPU: </label>
          <Autosuggest 
            suggestions={cpuSuggestions}
            onSuggestionsFetchRequested={onCpuSuggestionsFetchRequested}
            onSuggestionsClearRequested={onCpuSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={cpuInputProps}
          />
        </div>
        <div>
          <label>GPU: </label>
          <Autosuggest 
            suggestions={gpuSuggestions}
            onSuggestionsFetchRequested={onGpuSuggestionsFetchRequested}
            onSuggestionsClearRequested={onGpuSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={gpuInputProps}
          />
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
