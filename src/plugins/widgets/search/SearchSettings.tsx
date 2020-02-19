import React, { FC } from 'react';

import { engines } from './engines';
import { Props, defaultData } from './types';
import { FormGroup, Label, CustomInput, Input } from 'reactstrap';

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
      <FormGroup>
        <Label>Suggestion Quantity</Label>
        <Input
          type="number"
          min="1"
          max="10"
          value={data.suggestionsQuantity}
          onChange={event =>
            setData({
              ...data,
              suggestionsQuantity: Number(event.target.value),
            })
          }
        />
      </FormGroup>
    )}
  </div>
);

export default SearchSettings;
