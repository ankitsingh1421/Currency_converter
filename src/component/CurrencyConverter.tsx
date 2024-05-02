import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyDropdown from './Dropdown';
import { HiArrowsRightLeft } from 'react-icons/hi2';

interface CurrencyData {
  [key: string]: string;
}

const CurrencyConverter: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [converting, setConverting] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '["INR", "EUR"]')
  );

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/currencies');
      const data: CurrencyData = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error('Error Fetching', error);
    }
  };

  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + ' ' + toCurrency);
    } catch (error) {
      console.error('Error Fetching', error);
    } finally {
      setConverting(false);
    }
  };

  const handleFavorite = (currency: string) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
      toast.info(` ${currency} Removed from favorites`);
    } else {
      updatedFavorites.push(currency);
      toast.success(` ${currency} Added to favorites`);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md"style={{backgroundColor:"#bad7f2", marginLeft:"120px" }}>
      <ToastContainer />
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">Currency Converter</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          favorites={favorites}
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencyDropdown
          favorites={favorites}
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title="To:"
          handleFavorite={handleFavorite}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            converting ? 'animate-pulse' : ''
          }`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;


