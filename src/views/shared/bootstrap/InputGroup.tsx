import React, { FC } from 'react';
import { FormGroup, Input, InputProps, Label } from 'reactstrap';


/**
 * Form group with an input inside of it, same props as a reactstrap `Input`. Children will be added to the label.
 */
const InputGroup: FC<InputProps> = props => (
  <FormGroup>
    <Label htmlFor={props.id ? props.id : undefined}>{props.children}</Label>
    <Input {...props} />
  </FormGroup>
);

export default InputGroup;
