'use client';

import { ChangeEvent, useState } from 'react';
import { useWeather } from '../lib';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState(String);
  const [city, setCity] = useState(Object);
  const { getSearch } = useWeather;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCity(getSearch(inputValue));
  };

  return (
    <div>
      <input type='text' value={inputValue} onChange={onInputChange}></input>
      <p></p>
    </div>
  );
}
