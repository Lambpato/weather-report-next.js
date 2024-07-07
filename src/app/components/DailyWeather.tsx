import Image from "next/image";

interface forecastdayTypes {
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
}

interface weekdayTypes {
  weekday: forecastdayTypes[];
}

export default function DailyWeather({ weekday }: weekdayTypes) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const weekdayWeather = weekday.map((day) => (
    <div
      key={weekday.indexOf(day)}
      className="grid grid-cols-3 place-items-center px-4 py-2 rounded-xl shadow-md shadow-cyan-600/45"
    >
      <p className="w-full text-start text-lg font-semibold">
        {
          weekdays[
            (() => {
              const dayIndex = new Date(day.date).getDay();
              return dayIndex === 6 ? 0 : dayIndex + 1;
            })()
          ]
        }
      </p>
      <Image
        src={`https:${day.day.condition.icon}`}
        alt={`${day.day.condition.text} icon`}
        width={45}
        height={45}
      />
      <div className="w-full flex justify-between">
        <p>{`${Math.round(day.day.mintemp_f)}°`}</p>
        <p>{`${Math.round(day.day.maxtemp_f)}°`}</p>
      </div>
    </div>
  ));

  return (
    <section className="max-w-xl grid place-items-center">
      <div className="w-full bg-sky-500 grid rounded-xl shadow-2xl flex p-6 m-6 gap-2">
        {weekdayWeather}
      </div>
    </section>
  );
}
