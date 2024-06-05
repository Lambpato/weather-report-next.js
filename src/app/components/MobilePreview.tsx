import Image from "next/image";
import Clock from "react-live-clock";
import HourlyWeather from "./HourlyWeather";
import { forecastTypes } from "../forecast/interface";

export default function MobilePreview({
  forecast,
}: {
  forecast: forecastTypes;
}) {
  return (
    <div className="max-w-sm">
      <div className="w-full rounded-2xl shadow-2xl shadow-cyan-950 flex px-6 py-3 m-6 gap-2">
        <div className="w-min">
          <p className="text-xl font-medium">{forecast.location.name}</p>
          <Clock
            format={"hh:mma"}
            ticking={true}
            timezone={forecast.location.tz_id}
            className="text-lg font-medium"
          />
          <p className="text-5xl pt-1.5">{`${Math.round(
            forecast.current.temp_f
          )}°`}</p>
          <div className="flex items-center">
            <p className="text-md font-medium">
              {forecast.current.condition.text}
            </p>
            <Image
              src={`https:${forecast.current.condition.icon}`}
              alt={`${forecast.current.condition.text} icon`}
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
    </div>
  );
}
