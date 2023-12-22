'use client';

import { ChangeEvent, useState } from 'react';
import Options from './Options';
import { getSearch, saveLocation } from '../lib';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [city, setCity] = useState([]);

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
      <div className='w-4/5 border-2 rounded-xl h-2/5 p-5'>
        <h1 className='font-sans text-center font-medium text-2xl pb-5'>
          Weather Report
        </h1>
        <form
          onSubmit={saveLocation}
          className='flex flex-row justify-between items-start'
        >
          <div>
            <input
              className='text-black w-48 py-0.5 rounded focus:outline-double'
              type='text'
              name='location'
              value={inputValue}
              onChange={onInputChange}
            />
            {inputValue.trim().length > 2 && (
              <Options setInputValue={setInputValue} locations={city} />
            )}
          </div>
          <button type='submit' className='font-medium'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
