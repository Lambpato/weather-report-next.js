import { FormEvent } from 'react'
import { redirect } from 'next/navigation';

export const getSearch = async (query: string) => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?q=${query}&key=bb2468a183ea4225855173630232702`);
    if (!response.ok) throw new Error(`Something bad happened ${response.status}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.error(e);
  }
};

export  const getForecast = async (query: string) => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&key=bb2468a183ea4225855173630232702`);
    if (!response.ok) throw new Error(`Something bad happened ${response.status}`);
    const jsonData = await response.json();
    return jsonData;
  } catch(e) {
    console.error(e);
  }
}

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
    const locationDataString = localStorage.getItem('location');
    return locationDataString && JSON.parse(locationDataString);
  }

  return null;
};
