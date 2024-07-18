"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { forecastTypes } from "./interface";
import { getForecast } from "../lib";
import MobilePreview from "../components/MobilePreview";
import HourlyWeather from "../components/HourlyWeather";
import DailyWeather from "../components/DailyWeather";
import WeatherAlerts from "../components/WeatherAlerts";

export default function Page() {
  const [forecast, setForecast] = useState<forecastTypes>();

  useEffect(() => {
    const localStorageForecast: string | null =
      localStorage.getItem("location");
    if (localStorageForecast) {
      const settingForecast = async () => {
        setForecast(await getForecast(localStorageForecast));
        console.log(await getForecast(localStorageForecast));
      };
      settingForecast();
    }
  }, []);

  if (forecast)
    return (
      <>
        <main className="max-width-2xl mx-8">
          <section>
            <div className="grid place-items-center p-8">
              <h1 className="text-3xl">{forecast.location.name}</h1>
              <h3 className="text-2xl">{`${Math.round(
                forecast.current.temp_f
              )}°`}</h3>
              <div className="w-1/2 h-full flex flex-row items-center justify-between">
                <p className="text-lg font-medium">
                  {forecast.current.condition.text}
                </p>
                <Image
                  src={`https:${forecast.current.condition.icon}`}
                  alt={`${forecast.current.condition.text} icon`}
                  width={40}
                  height={40}
                />
              </div>
              <div className="w-1/2 flex flex-row justify-between">
                <p className="text-lg font-medium">{`H: ${Math.round(
                  forecast.forecast.forecastday[0].day.maxtemp_f
                )}°`}</p>
                <p className="text-lg font-medium">{`L: ${Math.round(
                  forecast.forecast.forecastday[0].day.mintemp_f
                )}°`}</p>
              </div>
            </div>
          </section>
          <MobilePreview forecast={forecast} />
          <section className="max-w-xl grid place-items-center">
            <div className="w-full bg-sky-500 grid rounded-xl shadow-2xl p-6 m-6 gap-2">
              <HourlyWeather
                todayHours={forecast.forecast.forecastday[0].hour}
                tmrwHours={forecast.forecast.forecastday[1].hour}
                timeZone={forecast.location.tz_id}
              />
              <div className="w-full flex justify-between">
                <div className="flex flex-col justify-between p-4 border border-cyan-600 rounded-2xl shadow-md shadow-cyan-600/45">
                  <h3 className="text-xl font-semibold">Condition</h3>
                  <Image
                    src={`https:${forecast.current.condition.icon}`}
                    alt={`${forecast.current.condition.text} icon`}
                    width={60}
                    height={60}
                  />
                  <p className="text-md font-medium">
                    {forecast.current.condition.text}
                  </p>
                </div>
                <div className="w-min p-4 border border-cyan-600 rounded-xl shadow-md shadow-cyan-600/45">
                  <h3 className="text-xl font-semibold">Wind Conditions</h3>
                  <p className="text-md font-medium">{`Direction: ${forecast.current.wind_dir}`}</p>
                  <p className="text-md font-medium">{`MPH: ${forecast.current.wind_mph}`}</p>
                </div>
              </div>
              <div className="w-full flex justify-between">
                <div className="p-4 border border-cyan-600 rounded-2xl shadow-md shadow-cyan-600/45">
                  <h3 className="text-xl font-semibold">Humidity</h3>
                  <p className="text-lg font-medium">{`${forecast.current.humidity}%`}</p>
                  <Image
                    src="/humidity.svg"
                    alt="Humidity"
                    height={50}
                    width={50}
                    style={{
                      filter:
                        "invert(65%) sepia(15%) saturate(217%) hue-rotate(190deg) brightness(92%) contrast(85%) drop-shadow(0 0 0.1rem rgb(59, 59, 59))",
                    }}
                    className="drop-shadow-md"
                  />
                </div>
                <div className="p-4 border border-cyan-600 rounded-2xl shadow-md shadow-cyan-600/45">
                  <h3 className="text-xl font-semibold">Chance of Rain</h3>
                  <p className="text-lg font-medium">{`${forecast.forecast.forecastday[0].day.daily_chance_of_rain}%`}</p>
                  <Image
                    src="https://cdn.weatherapi.com/weather/64x64/day/263.png"
                    alt="Chance of Rain"
                    height={60}
                    width={60}
                    className="drop-shadow-md shadow-white"
                  />
                </div>
              </div>
              <div className="w-full p-4 border border-cyan-600 rounded-2xl shadow-md shadow-cyan-600/45 justify-between">
                <h3 className="text-xl font-semibold">Astro</h3>
                <div className="w-full flex justify-between">
                  <p className="text-sm font-medium">{`Sunrise: ${forecast.forecast.forecastday[0].astro.sunrise}`}</p>
                  <p className="text-sm font-medium">{`Sunset: ${forecast.forecast.forecastday[0].astro.sunset}`}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-sm font-medium">{`Moonrise: ${forecast.forecast.forecastday[0].astro.moonrise}`}</p>
                  <p className="text-sm font-medium">{`Moonset: ${forecast.forecast.forecastday[0].astro.moonset}`}</p>
                </div>
              </div>
            </div>
          </section>
          <DailyWeather weekday={forecast.forecast.forecastday} />
          <WeatherAlerts forecastAlerts={forecast.alerts.alert} />
        </main>
      </>
    );
}
