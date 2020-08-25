import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { defaultLocale } from '../../locales';
import { useSelector } from '../../store';
import { setLocale, setTimeZone } from '../../store/actions';
import TimeZoneInput from '../shared/timeZone/TimeZoneInput';


const System: FC = () => {
  const locale = useSelector(state => state.data.locale || defaultLocale);
  const timeZone = useSelector(state => state.data.timeZone || '');

  const dispatch = useDispatch();
  const handleSetLocale = (event: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(setLocale(event.target.value));
  const handleSetTimeZone = (timeZone?: string) =>
    dispatch(setTimeZone(timeZone));

  return (
    <div>
      <h2>
        <FormattedMessage
          id="settings"
          defaultMessage="Settings"
          description="Settings title"
        />
      </h2>

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
        <select value={locale} onChange={handleSetLocale}>
          <option value="ca-ES" title="Catalan">
            Català
          </option>
          <option value="cs" title="Czech">
            Čeština
          </option>
          <option value="de" title="German">
            Deutsch
          </option>
          <option value="el" title="Greek">
            Ελληνικά
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
          <option value="ja" title="Japanese">
            日本語
          </option>
          <option value="ko" title="Korean">
            한국어
          </option>
          <option value="lt" title="Lithuanian">
            Lietuvių k.
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
          <option value="pt-BR" title="Portuguese (Brazil)">
            Português do Brasil
          </option>
          <option value="pt" title="Portuguese (Portugal)">
            Português de Portugal
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
          <option value="sv" title="Swedish">
            Svenska
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
          <option value="hi" title="Hindi">
            हिन्दी
          </option>
          <option value="gu" title="Gujarati">
            ગુજરાતી
          </option>
          <option value="uk" title="Ukrainian">
            Українська
          </option>
        </select>
      </label>

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
        Time Zone
        <TimeZoneInput timeZone={timeZone} onChange={handleSetTimeZone} />
      </label>
    </div>
  );
};

export default System;
