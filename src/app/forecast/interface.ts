export interface forecastTypes {
  location: {
    country: string;
    name: string;
    region: string;
    tz_id: string;
  };
  current: {
    condition: {
      icon: string;
      text: string;
    };
    humidity: number;
    temp_c: number;
    temp_f: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
  };
  forecast: {
    forecastday: forecastdaytypes[];
  };
}

interface forecastdaytypes {
  date: string;
  day: {
    condition: {
      icon: string;
      text: string;
    };
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
  };
  hour: [
    {
      condition: {
        icon: string;
        text: string;
      };
      temp_c: number;
      temp_f: number;
      time: string;
    }
  ];
}
