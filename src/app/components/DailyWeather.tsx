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

  const weekdayWeather = weekday.map((day, index) => (
    <div
      key={index}
      className="grid grid-cols-2 place-items-center px-4 py-1 border border-cyan-600 rounded-xl shadow-md shadow-cyan-600/45"
    >
      <div className="w-full flex jusitfy-around items-center">
        <p className="w-full text-lg font-semibold md:text-xl">
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
      </div>

      <div className="w-full flex justify-around items-center">
        <p className="font-medium text-base text-slate-300 md:text-lg">{`${Math.round(
          day.day.mintemp_f
        )}°`}</p>
        <p className="font-medium text-lg md:text-xl">{`${Math.round(
          day.day.maxtemp_f
        )}°`}</p>
      </div>
    </div>
  ));

  return (
    <section className="grid place-items-center">
      <div className="h-full w-full bg-sky-500 grid rounded-xl shadow-2xl p-6 gap-2">
        {weekdayWeather}
      </div>
    </section>
  );
}
