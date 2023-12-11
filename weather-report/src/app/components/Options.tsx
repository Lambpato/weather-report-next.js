interface Location {
  id: number;
  name?: string;
  region?: string;
}

export default function Options({ locations }: { locations: Location[] }) {
  const options = locations.map((x) => (
    <li key={x.id}>
      {x.name && (
        <span>
          {x.name}
          {x.region && `, ${x.region}`}
        </span>
      )}
    </li>
  ));

  return (
    <div>
      <ul>{options}</ul>
    </div>
  );
}