import Image from "next/image";
import Clock from "react-live-clock";
import HourlyWeather from "./HourlyWeather";
import { forecastTypes } from "../forecast/interface";
import { useState, useEffect } from "react";

export default function MobilePreview({
  forecast,
}: {
  forecast: forecastTypes;
}) {
  const [updatedForecast, setUpdatedForecast] =
    useState<forecastTypes>(forecast);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatedForecast(forecast);
    }, 1000);

    return () => clearInterval(interval);
  }, [forecast]);

  return (
    <section className="max-w-sm md:hidden">
      <div className="w-full rounded-2xl shadow-2xl shadow-cyan-950 flex px-6 py-3 gap-2">
        <div className="w-min">
          <p className="text-xl font-medium">{updatedForecast.location.name}</p>
          <Clock
            format={"hh:mma"}
            ticking={true}
            timezone={forecast.location.tz_id}
            className="text-lg font-medium"
          />
          <p className="text-5xl pt-1.5">{`${Math.round(
            updatedForecast?.current.temp_f
          )}°`}</p>
          <div className="flex items-center">
            <p className="text-md font-medium">
              {updatedForecast.current.condition.text}
            </p>
            <Image
              src={`https:${updatedForecast.current.condition.icon}`}
              alt={`${updatedForecast.current.condition.text} icon`}
              width={40}
              height={40}
            />
          </div>
        </div>
        <HourlyWeather
          todayHours={forecast.forecast.forecastday[0].hour}
          tmrwHours={forecast.forecast.forecastday[1].hour}
          timeZone={forecast.location.tz_id}
        />
      </div>
    </section>
  );
}
