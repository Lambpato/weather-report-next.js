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
    <div className='grid place-items-center items-start h-screen pt-12'>
      <div className='w-3/4 border-2 rounded-xl h-2/5 p-5'>
        <h1 className='font-sans text-center font-medium text-2xl pb-5'>
          Weather Report
        </h1>
        <div className='grid place-content-center'>
          <input
            className='text-black rounded focus:outline-double w-64
            '
            type='text'
            value={inputValue}
            onChange={onInputChange}
          />
          {inputValue.trim().length > 2 && <Options locations={city} />}
        </div>
      </div>
    </div>
  );
}
