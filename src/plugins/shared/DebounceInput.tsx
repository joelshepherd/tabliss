import React, { FC, useState, useEffect } from 'react';
import { useDebounce } from '../../hooks';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  wait: number;
  onChange: (value: string) => void;
}

export const DebounceInput: FC<Props> = ({ wait, onChange, ...props }) => {
  const [newValue, setNewValue] = useState(props.value as string | undefined);
  const debouncedValue = useDebounce(newValue, wait);

  useEffect(() => {
    if (typeof debouncedValue === 'string' && onChange) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <input
      {...props}
      value={newValue}
      onChange={event => setNewValue(event.target.value)}
    />
  );
};
