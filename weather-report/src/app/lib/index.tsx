'use server';

import { FormEvent } from 'react';

export const getSearch = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?q=${query}&key=bb2468a183ea4225855173630232702`
    );
    if (!response.ok)
      throw new Error(`Something bad happened ${response.status}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.error(e);
  }
};

export const getForecast = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${query}&key=bb2468a183ea4225855173630232702`
    );
    if (!response.ok)
      throw new Error(`Something bad happened ${response.status}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.error(e);
  }
};

export const saveLocation = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    const locationName = formData.get('location') as string;
    const locationData = await getForecast(locationName);
    localStorage.setItem('location', JSON.stringify(locationData));
  } catch (error) {
    console.error('Error saving location:', error);
  }
};

export const forecastData = () => {
  if (typeof window !== 'undefined') {
    const locationData = localStorage.getItem('location');
    return locationData && JSON.parse(locationData);
  }

  return null;
};
