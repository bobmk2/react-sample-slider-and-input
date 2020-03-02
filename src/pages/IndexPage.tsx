import * as React from 'react';
import { SliderAndInput } from '../components/SliderAndInput';

export const IndexPage = () => {
  const [value, setValue] = React.useState(0);
  const [isValid, setIsValid] = React.useState(true);

  const handleChangeValue = React.useCallback((next: number, isValid: boolean) => {
    setValue(next);
    setIsValid(isValid);
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <h4>React Sample Slider and Input</h4>
      <div>
        <div>value: {value}</div>
        <SliderAndInput value={value} onChangeValue={handleChangeValue} max={100} min={-10} step={0.1} />
        {isValid ? <span style={{ color: 'green' }}>OK</span> : <span style={{ color: 'red' }}>NG (Out of range)</span>}
      </div>
    </div>
  );
};
