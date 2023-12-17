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

export const getForecast = async (query: string) => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&key=bb2468a183ea4225855173630232702`);
    if (!response.ok) throw new Error(`Something bad happened ${response.status}`);
    const jsonData = await response.json();
    return jsonData;
  } catch(e) {
    console.error(e);
  }
}
