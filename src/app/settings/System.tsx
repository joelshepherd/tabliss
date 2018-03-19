import { Info } from 'luxon';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action, changeLocale, changeTimezone, RootState } from '../../data';
import { defaultLocale } from '../../locales';

const timezones: string[] = require('./timezones.json');

interface Props {
  changeLocale: (locale: string) => Action;
  changeTimezone: (timezone?: string) => Action;
  locale: string;
  timezone: string;
}

const System: React.StatelessComponent<Props> = (props) => {
  const onChangeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.changeLocale(event.target.value);
  };
  const onChangeTimezone = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.changeTimezone(event.target.value || undefined);
  };

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
        <select value={props.locale} onChange={onChangeLocale} style={{ padding: '0.25rem' }}>
          <option value="en" title="English">English</option>
          <option value="fr" title="French">Français</option>
          <option value="ko" title="Korean">한국어</option>
          <option value="zh" title="Simplified Chinese">中文(简体)</option>
        </select>
      </label>

      {Info.features().zones && (
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
            value={props.timezone}
            onChange={onChangeTimezone}
            style={{ padding: '0.25rem', fontSize: '1em' }}
          >
            <option value="">Automatic</option>
            {timezones.map(timezone =>
              <option key={timezone} value={timezone}>{timezone.replace('_', ' ')}</option>
            )}
          </select>
        </label>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  locale: state.settings.locale || defaultLocale,
  timezone: state.settings.timezone,
});

const mapDispatchToProps = { changeLocale, changeTimezone };

export default connect(mapStateToProps, mapDispatchToProps)(System);
