import { Info } from 'luxon';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../store';
import { setLocale } from '../../store/actions';
import { defaultLocale } from '../../locales';

const timezones: string[] = require('./timezones.json');

const System: FC = () => {
  const dispatch = useDispatch();
  const locale = useSelector(state => state.settings.locale || defaultLocale);
  const handleSetLocale = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch(setLocale(event.target.value)),
    [dispatch],
  );

  // const onChangeTimezone = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   let zone: string | undefined = event.target.value;

  //   // Check for a valid zone in this browser
  //   if (zone && !Info.isValidIANAZone(zone)) {
  //     alert(`Sorry, the timezone ${zone} is not supported in your browser.`);
  //     zone = undefined;
  //   }

  //   props.changeTimezone(zone);
  // };

  return (
    <div>
      <label
        style={{
          alignItems: 'center',
          display: 'grid',
          gridGap: '0 0.5rem',
          gridTemplateColumns: '1fr 2fr',
          width: '100%',
          margin: 0,
        }}
      >
        <span>Language</span>
        <select
          value={locale}
          onChange={handleSetLocale}
          style={{ padding: '0.25rem' }}
        >
          <option value="cs" title="Czech">
            Čeština
          </option>
          <option value="de" title="German">
            Deutsch
          </option>
          <option value="en-AU" title="English (Australian)">
            English (AU)
          </option>
          <option value="en-GB" title="English (British)">
            English (GB)
          </option>
          <option value="en" title="English (American)">
            English (US)
          </option>
          <option value="es" title="Spanish">
            Español
          </option>
          <option value="fr" title="French">
            Français
          </option>
          <option value="hu" title="Hungarian">
            Magyar
          </option>
          <option value="id" title="Indonesian">
            Indonesian
          </option>
          <option value="it" title="Italian">
            Italiano
          </option>
          <option value="ko" title="Korean">
            한국어
          </option>
          <option value="nl" title="Dutch">
            Nederlands
          </option>
          <option value="no" title="Norwegian">
            Norsk
          </option>
          <option value="pl" title="Polish">
            Polski
          </option>
          <option value="pt" title="Portuguese">
            Português
          </option>
          <option value="ro" title="Romanian">
            Română
          </option>
          <option value="ru" title="Russian">
            Русский
          </option>
          <option value="sk" title="Slovak">
            Slovenčina
          </option>
          <option value="tr" title="Turkish">
            Türkçe
          </option>
          <option value="vi" title="Vietnamese">
            Tiếng Việt
          </option>
          <option value="zh-CN" title="Simplified Chinese (China)">
            中文（中国）
          </option>
          <option value="zh-TW" title="Traditional Chinese (Taiwan)">
            中文（台灣）
          </option>
        </select>
      </label>

      {/* {Info.features().zones && (
        <label
          style={{
            alignItems: 'center',
            display: 'grid',
            gridGap: '0 0.5rem',
            gridTemplateColumns: '1fr 2fr',
            width: '100%',
            margin: 0,
          }}
        >
          Timezone
          <select
            value={props.timezone || ''}
            onChange={onChangeTimezone}
            style={{ padding: '0.25rem', fontSize: '1em' }}
          >
            <option value="">Automatic</option>
            {timezones.map(timezone => (
              <option key={timezone} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>
        </label>
      )} */}
    </div>
  );
};

export default System;
