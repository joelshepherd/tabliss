import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { getConvertedDate } from '../../../utils';
import { messages } from './messages';
import { Props, defaultData } from './types';

function getHour() {
  return getConvertedDate().getHours();
}

const Greeting: React.FC<Props & InjectedIntlProps> = ({
  data = defaultData,
  intl,
}) => {
  const [hour, setHour] = React.useState(getHour());
  React.useEffect(() => {
    const id = setInterval(() => setHour(getHour()));
    return () => clearInterval(id);
  });

  const greeting = data.name
    ? intl.formatMessage(messages.greetingWithName, {
        hour: hour,
        name: data.name,
      })
    : intl.formatMessage(messages.greeting, {
        hour: hour,
      });

  return (
    <div className="Greeting">
      <h2>{greeting}</h2>
    </div>
  );
};

export default injectIntl(Greeting);
