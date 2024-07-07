"useclient";

import { FormEvent } from "react";

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

export const saveLocation = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    const locationName = formData.get("location") as string;
    localStorage.setItem("location", locationName);
  } catch (error) {
    console.error("Error saving location:", error);
  }
};

export const getForecast = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=bb2468a183ea4225855173630232702&q=${query}&days=7&alerts=yes`
    );
    if (!response.ok)
      throw new Error(`Something bad happened ${response.status}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.error(e);
  }
};
