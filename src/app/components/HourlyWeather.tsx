import Image from "next/image";
import { useState, useEffect, use } from "react";

interface Hour {
  condition: {
    icon: string;
    text: string;
  };
  temp_c: number;
  temp_f: number;
  time: string;
}

interface HourlyWeatherTypes {
  todayHours: Hour[];
  tmrwHours: Hour[];
  timeZone: string;
}

export default function HourlyWeather({
  todayHours,
  tmrwHours,
  timeZone,
}: HourlyWeatherTypes) {
  const [currentTime, setCurrentTime] = useState<string>(
    `${new Date()
      .toLocaleString("sv-SE", {
        timeZone: timeZone,
        hour12: false,
      })
      .slice(0, -6)}:00`
  );

  const [xlviiiHours, setxlviiiHours] = useState<Hour[]>([
    ...todayHours,
    ...tmrwHours,
  ]);

  const [displayHours, setDisplayHours] = useState<Hour[]>(
    xlviiiHours?.slice(
      xlviiiHours.findIndex((i) => i.time === currentTime) + 1,
      xlviiiHours.findIndex((i) => i.time === currentTime) + 25
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date()
        .toLocaleString("sv-SE", {
          timeZone: timeZone,
          hour12: false,
        })
        .slice(0, -6);

      setCurrentTime(time + ":00");
      setxlviiiHours([...todayHours, ...tmrwHours]);
      setDisplayHours(
        xlviiiHours?.slice(
          xlviiiHours.findIndex((i) => i.time === currentTime) + 1,
          xlviiiHours.findIndex((i) => i.time === currentTime) + 25
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timeZone, todayHours, tmrwHours, xlviiiHours, currentTime]);

  const militaryToStandard = (time: string) => {
    const timeSplit = time.split(":");
    const hours = Number(timeSplit[0]);
    const minutes = Number(timeSplit[1]);
    let standardTime;

    if (hours > 0 && hours <= 12) {
      standardTime = "" + hours;
    } else if (hours > 12) {
      standardTime = "" + (hours - 12);
    } else if (hours == 0) {
      standardTime = "12";
    }

    standardTime += minutes < 10 ? ":0" + minutes : ":" + minutes;

    return standardTime;
  };

  const hourlyScroll = displayHours?.map((x) => (
    <div key={displayHours.indexOf(x)} className="grid place-items-center	p-1.5">
      <p className="text-lg font-medium">{`${Math.round(x.temp_f)}°`}</p>
      <div className="w-max">
        <Image
          src={`https:${x.condition.icon}`}
          alt={`${x.condition.text} icon`}
          width={50}
          height={50}
          priority={true}
        />
      </div>
      <p className="text-lg font-medium">
        {militaryToStandard(x.time.slice(displayHours[0].time.indexOf(" ")))}
      </p>
    </div>
  ));

  return (
    <div className="w-full overflow-x-scroll items-center">
      <div className="flex ">{hourlyScroll}</div>
    </div>
  );
}
