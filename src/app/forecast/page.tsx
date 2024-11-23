"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { forecastTypes } from "./interface";
import { getForecast } from "../lib";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import MobilePreview from "../components/MobilePreview";
import CurrentView from "../components/CurrentView";
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
        <div className="w-full grid grid-cols-2 items-center justify-items-end">
          <ChevronLeftIcon
            className={
              !isMobilePreviewActive
                ? "w-14 h-14 place-self-start md:hidden"
                : "hidden"
            }
            onClick={() => setIsMobilePreviewActive(!isMobilePreviewActive)}
          />
          <button
            className={
              isMobilePreviewActive
                ? "px-2 py-1 mb-4 bg-red-700 rounded-full font-semibold col-span-2"
                : "hidden"
            }
            onClick={() => {
              localStorage.removeItem("location");
              router.push("/");
            }}
          >
            Delete
          </button>
        </div>
        <div
          className={isMobilePreviewActive ? "grid" : "hidden"}
          onClick={() => setIsMobilePreviewActive(!isMobilePreviewActive)}
        >
          <MobilePreview forecast={forecast} />
        </div>

        <div className={!isMobilePreviewActive ? "grid" : "hidden md:grid"}>
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
                  width={50}
                  height={50}
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
            <CurrentView forecast={forecast} />
            <DailyWeather weekday={forecast.forecast.forecastday} />
            <WeatherAlerts forecastAlerts={forecast.alerts.alert} />
          </div>
        </div>
      </main>
    );
  }
}
