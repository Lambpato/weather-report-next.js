interface alertTypes {
  desc: string;
  instructions: string;
  severity: string;
}

interface alertsTypes {
  forecastAlerts: alertTypes[];
}

export default function WeatherAlerts({ forecastAlerts }: alertsTypes) {
  const regex = new RegExp("(?=\\*)", "g");

  if (forecastAlerts.length > 0 && forecastAlerts) {
    const displayAlerts = forecastAlerts.map((alerts, index) => (
      <div
        key={index}
        className="w-full snap-center shrink-0 p-4 border border-cyan-600 rounded-xl shadow-xl shadow-cyan-600/45"
      >
        <h3 className="text-xl font-medium">
          Severity:
          <span className="text-lg">
            {!alerts.severity ? " Unkown" : alerts.severity}
          </span>
        </h3>
        <br />
        <hr />
        <br />
        <h3 className="text-xl font-medium">Description</h3>
        <p className="h-56 overflow-scroll whitespace-pre-line">
          {alerts.desc.split(regex).join("\n")}
        </p>
        <br />
        <hr />
        <br />
        <h3 className="text-xl font-medium">Actions Recommended</h3>
        <p>
          {!alerts.instructions
            ? "Execute a pre-planned activity as instructed in the Description."
            : alerts.instructions}
        </p>
      </div>
    ));

    return (
      <section className="max-w-xl max-h-96	grid place-items-center">
        <div className="w-full bg-sky-500 grid rounded-xl shadow-2xl p-6 m-6 gap-2">
          <h1 className="text-center text-5xl font-bold text-red-600 drop-shadow-xl underline underline-offset-4 p-4 mb-4">
            Alerts
          </h1>
          <div className="flex snap-x overflow-x-scroll gap-8">
            {displayAlerts}
          </div>
        </div>
      </section>
    );
  }
}
