import React from 'react';
import { HiOutlineStar, HiStar } from 'react-icons/hi2';

interface Props {
  currencies: string[];
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  favorites: string[];
  handleFavorite: (currency: string) => void;
  title?: string;
}

const CurrencyDropdown: React.FC<Props> = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = '',
}) => {
  const isFavorite = (curr: string) => favorites.includes(curr);

  return (
    <div>
      <label htmlFor={title} className="block text-sm font-medium text-gray-700">
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favorites.map((curr) => (
            <option className="bg-gray-200" value={curr} key={curr}>
              {curr}
            </option>
          ))}
          <hr />
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((curr) => (
              <option value={curr} key={curr}>
                {curr}
              </option>
            ))}
        </select>

        <button
          onClick={() => handleFavorite(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
