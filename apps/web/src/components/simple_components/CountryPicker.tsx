import Select from 'react-select';
import countries from 'world-countries'; 

const countryOptions = countries.map((c) => ({
  value: c.cca2,
  label: `${c.flag} ${c.name.common}`,
}));

function CountryPicker({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  const selected = countryOptions.find((opt) => opt.value === value);

  return (
    <Select
      unstyled
      options={countryOptions}
      value={selected}
      onChange={(opt) => onChange(opt?.value ?? '')}
      classNames={{
        control: () => 'dark:bg-mist-900 bg-white border dark:border-mist-700 border-gray-300 rounded-md p-1',
        menu: () => 'dark:bg-mist-900 bg-white border dark:border-mist-700 border-gray-300 rounded-md mt-1',
        option: ({ isFocused }) =>
          `px-3 py-2 cursor-pointer ${isFocused ? 'dark:bg-mist-700 bg-gray-100' : ''}`,
        singleValue: () => 'dark:text-white text-gray-900',
        input: () => 'dark:text-white text-gray-900',
        placeholder: () => 'dark:text-gray-400 text-gray-500',
      }}
    />
  );
}

export default CountryPicker