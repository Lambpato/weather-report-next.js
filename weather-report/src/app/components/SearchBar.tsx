'use client';

import { ChangeEvent, useState } from 'react';
import Options from './Options';
import { getSearch } from '../lib';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [city, setCity] = useState([]);

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    try {
      const result = await getSearch(e.target.value);
      setCity(result);
      console.log(city, 'city');
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
      <Options locations={city} />
    </div>
  );
}
