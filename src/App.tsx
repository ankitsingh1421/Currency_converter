import React from 'react';
import './App.css';
import image from './new.jpg'
import CurrencyConverter from './component/CurrencyConverter';

const App: React.FC = () => {
  return (
  <div className="ankit min-h-screen flex  flex-col items-center justify-center">
      <div className="container flex items-center justify-center">
        <div className="container">
          <CurrencyConverter />
        </div>
        <img src={image} alt="image" height={'500px'} width={'500px'} style={{ marginRight: '150px' }} />
      </div>
    </div>
  );
};

export default App;


