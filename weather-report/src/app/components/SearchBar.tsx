'use client';

import { ChangeEvent, useState } from 'react';
import Options from './Options';
import { getSearch } from '../lib';

export default function SearchBar() {
  interface City {
    id: number;
    name: string;
    region: string;
  }

  const [inputValue, setInputValue] = useState('');
  const [city, setCity] = useState<City[]>([]);

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    try {
      if (value) {
        const result = await getSearch(value);
        setCity(result);
      } else {
        setCity([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <input
        className='text-black'
        type='text'
        value={inputValue}
        onChange={onInputChange}
      />
      {inputValue !== '' && <Options locations={city} />}
    </div>
  );
}
