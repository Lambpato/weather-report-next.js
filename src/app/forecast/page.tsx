"use client";

import MobilePreview from "../components/MobilePreview";
import { useEffect, useState } from "react";
import { forecastTypes } from "./interface";
import { getForecast } from "../lib";

export default function Page() {
  const [forecast, setForecast] = useState<forecastTypes>();

  useEffect(() => {
    const localStorageForecast: string | null =
      localStorage.getItem("location");
    if (localStorageForecast) {
      const settingForecast = async () => {
        setForecast(await getForecast(localStorageForecast));
      };
      settingForecast();
    }
  }, []);

  return <div>{forecast && <MobilePreview forecast={forecast} />}</div>;
}
