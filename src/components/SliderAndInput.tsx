import * as React from 'react';
import { usePrevious } from '../hooks/use-previous';

type PropTypes = {
  value: number;
  min: number;
  max: number;
  step: number | 'any';
  onChangeValue: (next: number, isValid?: boolean) => void;
};

const _SliderAndInput = (props: PropTypes) => {
  const { value, onChangeValue, min, max, step } = props;

  const handleChange = React.useCallback(
    (next: number) => {
      const isValid = !(isNaN(next) || next < min || max < next);

      /**
       * @memo Is step validation required? (Now, not validated.)
       * ex)
       *   valid => step: 0.1 / value: 0.5
       * invalid => step: 0.1 / value: 0.51
       */

      onChangeValue(next, isValid);
    },
    [onChangeValue, min, max]
  );

  return (
    <div>
      <Slider style={{ width: '200px' }} value={value} onChangeValue={handleChange} max={max} min={min} step={step} />
      <InputNumber value={value} onChangeValue={handleChange} />
    </div>
  );
};

_SliderAndInput.defaultProps = {
  min: 0,
  max: 100,
  step: 1
};

export const SliderAndInput = React.memo(_SliderAndInput);

type SliderPropTypes = {
  className?: string;
  style?: React.CSSProperties;
  value: number;
  onChangeValue: (next: number) => void;
  min?: string | number;
  max?: string | number;
  step?: string | number | 'any';
};

const Slider = (props: SliderPropTypes) => {
  const { className, style, value, onChangeValue, min, max, step } = props;

  const [_value, setValue] = React.useState(value);

  const handleChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const next = parseFloat(event.currentTarget.value);

      setValue(next);
      if (!isNaN(next)) {
        onChangeValue(next);
      }
    },
    [onChangeValue]
  );

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <input
      className={className}
      style={style}
      type='range'
      min={min}
      max={max}
      step={step}
      value={_value}
      onChange={handleChange}
    />
  );
};

type InputNumberPropTypes = {
  value: number;
  onChangeValue: (next: number) => void;
};

const InputNumber = (props: InputNumberPropTypes) => {
  const { value, onChangeValue } = props;

  const [_value, setValue] = React.useState<string>(value.toString());
  const prevValue = usePrevious(value);

  const handleChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const next = event.currentTarget.value;
      setValue(next);

      const nextNumber = parseFloat(next);
      if (!isNaN(nextNumber)) {
        onChangeValue(nextNumber);
      }
    },
    [onChangeValue]
  );

  const isValid = React.useMemo(() => !isNaN(parseFloat(_value)), [_value]);

  React.useEffect(() => {
    const parsed = parseFloat(_value);
    if ((value !== prevValue || (_value !== '' && !isNaN(parsed))) && value !== parsed) {
      setValue(value.toString());
    }
  }, [prevValue, value, _value]);

  return (
    <>
      <input type='text' value={_value} onChange={handleChange} />
      {!isValid ? <span style={{ color: 'red' }}>invalid</span> : null}
    </>
  );
};
