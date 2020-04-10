import React, { FC } from 'react';
import { CustomInput, FormGroup, Label } from 'reactstrap';

import InputGroup from '../../../views/shared/bootstrap/InputGroup';
import { engines } from './engines';
import { defaultData, Props } from './types';

const SearchSettings: FC<Props> = ({ data = defaultData, setData }) => (
  <div className="SearchSettings">
    <FormGroup>
      <Label>Search Provider</Label>
      <CustomInput
        type="select"
        id="searchProviderSelect"
        onChange={event =>
          setData({ ...data, searchEngine: event.target.value })
        }
        value={data.searchEngine}
      >
        {engines.map(({ key, name }) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </CustomInput>
    </FormGroup>

    {process.env.BUILD_TARGET !== 'firefox' && (
      <FormGroup>
        <Label>Suggestions Provider</Label>

        <CustomInput
          type="select"
          onChange={event =>
            setData({ ...data, suggestionsEngine: event.target.value })
          }
          value={data.suggestionsEngine}
        >
          <option key="off" value="">
            Off
          </option>
          {engines
            .filter(({ suggest_url }) => Boolean(suggest_url))
            .map(({ key, name }) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
        </CustomInput>
      </FormGroup>
    )}

    {data.suggestionsEngine && (
      <InputGroup
        min="1"
        max="10"
        type="number"
        label="Suggestion Quantity"
        value={data.suggestionsQuantity}
        onChange={event =>
          setData({
            ...data,
            suggestionsQuantity: Number(event.target.value),
          })
        }
      />
    )}
  </div>
);

export default SearchSettings;
