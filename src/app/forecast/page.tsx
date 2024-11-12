"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { forecastTypes } from "./interface";
import { getForecast } from "../lib";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import MobilePreview from "../components/MobilePreview";
import HourlyWeather from "../components/HourlyWeather";
import DailyWeather from "../components/DailyWeather";
import WeatherAlerts from "../components/WeatherAlerts";

export default function Page() {
  const [forecast, setForecast] = useState<forecastTypes>();
  const [isMobilePreviewActive, setIsMobilePreviewActive] =
    useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const localStorageForecast: string | null =
      localStorage.getItem("location");

    if (!localStorageForecast) {
      router.push("/");
    } else {
      const settingForecast = async () => {
        setForecast(await getForecast(localStorageForecast));
      };
      settingForecast();
    }
  }, [router]);

  if (forecast) {
    return (
      <main className="max-width-2x m-3 grid place-items-center">
        <div
          className={isMobilePreviewActive ? "grid" : "hidden"}
          onClick={() => setIsMobilePreviewActive(!isMobilePreviewActive)}
        >
          <MobilePreview forecast={forecast} />
        </div>
        <div className={!isMobilePreviewActive ? "grid" : "hidden md:grid"}>
          <ChevronLeftIcon
            className="w-14 h-14 md:hidden"
            onClick={() => setIsMobilePreviewActive(!isMobilePreviewActive)}
          />
          <section>
            <div className="grid place-items-center p-8 gap-3">
              <h1 className="text-3xl md:text-5xl">{forecast.location.name}</h1>
              <h3 className="text-2xl md:text-4xl">{`${Math.round(
                forecast.current.temp_f
              )}°`}</h3>
              <div className="w-1/2 h-full flex flex-row items-center justify-between">
                <p className="text-lg font-medium md:text-xl">
                  {forecast.current.condition.text}
                </p>
                <Image
                  src={`https:${forecast.current.condition.icon}`}
                  alt={`${forecast.current.condition.text} icon`}
                  width={45}
                  height={45}
                />
              </div>
              <div className="w-1/2 flex flex-row justify-between">
                <p className="text-lg font-medium md:text-xl">{`H: ${Math.round(
                  forecast.forecast.forecastday[0].day.maxtemp_f
                )}°`}</p>
                <p className="text-lg font-medium md:text-xl">{`L: ${Math.round(
                  forecast.forecast.forecastday[0].day.mintemp_f
                )}°`}</p>
              </div>
            </div>
          </section>
          <div className="grid md:grid-cols-2 gap-3">
            <section className="grid place-items-center">
              <div className="w-full bg-sky-500 grid rounded-xl shadow-2xl p-6 gap-2">
                <HourlyWeather
                  todayHours={forecast.forecast.forecastday[0].hour}
                  tmrwHours={forecast.forecast.forecastday[1].hour}
                  timeZone={forecast.location.tz_id}
                />
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col justify-between p-4 border border-cyan-600 rounded-2xl shadow-md shadow-cyan-600/45">
                    <h3 className="text-2xl font-semibold md:text-3xl">
                      Condition
                    </h3>
                    <Image
                      src={`https:${forecast.current.condition.icon}`}
                      alt={`${forecast.current.condition.text} icon`}
                      width={75}
                      height={75}
                    />
                    <p className="text-lg font-medium md:text-xl">
                      {forecast.current.condition.text}
                    </p>
                  </div>
                  <div className="flex flex-col p-4 border border-cyan-600 rounded-xl shadow-md shadow-cyan-600/45">
                    <h3 className="text-2xl font-semibold md:text-3xl">
                      Wind Conditions
                    </h3>
                    <div className="h-full flex flex-col justify-around">
                      <div className="flex items-center">
                        <p className="text-lg font-medium md:text-xl">
                          Direction:&nbsp;
                        </p>
                        <p className="text-base font-medium md:text-xl">
                          {forecast.current.wind_dir}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-lg font-medium md:text=xl">
                          MPH:&nbsp;
                        </p>
                        <p className="text-base font-medium md:text-xl">
                          {forecast.current.wind_mph}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="w-auto flex flex-col justify-between p-4 border border-cyan-600 rounded-2xl shadow-md shadow-cyan-600/45">
                    <h3 className="text-2xl font-semibold md:text-3xl">
                      Humidity
                    </h3>
                    <div className="h-full flex flex-col justify-around">
                      <Image
                        src="/humidity.svg"
                        alt="Humidity"
                        height={35}
                        width={35}
                        style={{
                          filter:
                            "invert(65%) sepia(15%) saturate(217%) hue-rotate(190deg) brightness(92%) contrast(85%) drop-shadow(0 0 0.1rem rgb(59, 59, 59))",
                        }}
                        className="drop-shadow-md"
                      />
                      <p className="text-4xl md:text-6xl">{`${forecast.current.humidity}%`}</p>
                    </div>
                  </div>
                  <div className="w-auto p-4 border border-cyan-600 rounded-2xl shadow-md shadow-cyan-600/45">
                    <h3 className="text-2xl font-semibold md:text-3xl">
                      Chance of Rain
                    </h3>
                    <p className="text-lg font-medium md:text-xl">{`${forecast.forecast.forecastday[0].day.daily_chance_of_rain}%`}</p>
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
                  <h3 className="text-2xl text-center font-semibold md:text-3xl">
                    Astro
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex justify-between items-center">
                      <p className="text-base font-semibold md:text-lg">
                        Sunrise:
                      </p>
                      <p className="text-sm font-medium md:text-base">
                        {forecast.forecast.forecastday[0].astro.sunrise}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-base font-semibold md:text-lg">
                        Sunset:
                      </p>
                      <p className="text-sm font-medium md:text-base">
                        {forecast.forecast.forecastday[0].astro.sunset}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex justify-between items-center">
                      <p className="text-base font-semibold md:text-lg">
                        Moonrise:
                      </p>
                      <p className="text-sm font-medium md:text-base">
                        {forecast.forecast.forecastday[0].astro.moonrise}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-base font-semibold md:text-lg">
                        Moonset:
                      </p>
                      <p className="text-sm font-medium md:text-base">
                        {forecast.forecast.forecastday[0].astro.moonset}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <DailyWeather weekday={forecast.forecast.forecastday} />
            <WeatherAlerts forecastAlerts={forecast.alerts.alert} />
          </div>
        </div>
      </main>
    );
  }
}
