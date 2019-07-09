import React, { FC } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { useTime } from '../../../utils/useTime';
import { messages } from './messages';
import { Props, defaultData } from './types';

const Greeting: FC<Props & InjectedIntlProps> = ({
  data = defaultData,
  intl,
}) => {
  const hour = useTime().getHours();

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
