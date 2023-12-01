import { useState } from "react";

type queryProps = {
  input: string
}

export const useWeather = () => {
  const [options, setOptions] = useState<[]>([]);

  const getSearch = async (props: queryProps) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/search.json?q=${props.input}&key=bb2468a183ea4225855173630232702`);
      if(response.ok!) throw new Error(`Something bad happened ${response.status}`);
      const jsonData = await response.json();
      setOptions(jsonData);
    } catch (e) {
      console.error(e);
    }
  }

  return {getSearch, options};
}
