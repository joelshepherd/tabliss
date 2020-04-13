import React, { FC, ReactElement } from 'react';
import { FormGroup, Input, InputProps, Label } from 'reactstrap';

export interface InputGroupProps extends InputProps {
  label: string | ReactElement;
}

/**
 * Form group with an input inside of it, same props as a reactstrap `Input`. Children will be added to the label.
 */
const InputGroup: FC<InputGroupProps> = (props) => (
  <FormGroup>
    <Label htmlFor={props.id || undefined}>{props.label}</Label>
    <Input {...props} />
  </FormGroup>
);

export default InputGroup;
