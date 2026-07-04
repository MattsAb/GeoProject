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
    options={countryOptions}
    value={selected}
    onChange={(opt) => onChange(opt?.value ?? '')}
    theme={(theme) => ({
        ...theme,
        colors: {
        ...theme.colors,
        primary: '#f59e0b',      
        primary75: '#fbbf24',
        primary50: '#fde68a',
        primary25: '#374151',    
        neutral0: '#1a1a1a',     
        neutral80: '#ffffff', 
        },
    })}
    />
  );
}

export default CountryPicker