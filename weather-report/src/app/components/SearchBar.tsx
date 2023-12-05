'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { getSearch } from '../lib';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [city, setCity] = useState(undefined);

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    try {
      const result = await getSearch(e.target.value);
      console.log(result);
      setCity(result);
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
    </div>
  );
}
