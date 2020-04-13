import React, { FC, useState, useEffect } from 'react';

import { useDebounce } from '../../hooks';
import InputGroup, {
  InputGroupProps,
} from '../../views/shared/bootstrap/InputGroup';

interface Props extends Omit<InputGroupProps, 'onChange'> {
  onChange: (value: string) => void;
  value?: string;
  wait?: number;
}

export const DebounceInput: FC<Props> = ({
  wait = 1000,
  onChange,
  label,
  ...props
}) => {
  const [newValue, setNewValue] = useState(props.value || '');
  const debouncedValue = useDebounce(newValue, wait);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <InputGroup
      {...props}
      label={label}
      value={newValue}
      onChange={(event) => setNewValue(event.target.value)}
    />
  );
};
