interface OptionProps {
  locations: { id: number; name: string; region?: string }[];
  setInputValue: (name: string) => void;
}

export default function Options({ locations, setInputValue }: OptionProps) {
  const setValue = (name: string) => {
    setInputValue(name);
  };

  const options = locations.map((x) => (
    <li
      key={x.id}
      onClick={() => setValue(x.name)}
      className='border text-black cursor-pointer'
    >
      {x.name && (
        <span>
          {x.name}
          {x.region && `, ${x.region}`}
        </span>
      )}
    </li>
  ));

  return <ul className='bg-white'>{options}</ul>;
}
