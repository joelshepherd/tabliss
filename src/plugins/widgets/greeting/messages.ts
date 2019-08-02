import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  greeting: {
    id: 'plugin.greeting.withoutName',
    defaultMessage: `{hour, select,
      0 {Sleep well}
      1 {Sleep well}
      2 {Sleep well}
      3 {Rise and shine}
      4 {Rise and shine}
      5 {Rise and shine}
      6 {Good morning}
      7 {Good morning}
      8 {Good morning}
      9 {Good morning}
      10 {Hello}
      11 {Hello}
      12 {Hello}
      13 {Hello}
      14 {Good afternoon}
      15 {Good afternoon}
      16 {Good afternoon}
      17 {Good afternoon}
      18 {Good evening}
      19 {Good evening}
      20 {Good evening}
      21 {Good evening}
      22 {Good night}
      23 {Good night}
    }`,
    description: 'Greetings per time of day',
  },
  greetingWithName: {
    id: 'plugin.greeting.withName',
    defaultMessage: `{hour, select,
      0 {Sleep well, {name}}
      1 {Sleep well, {name}}
      2 {Sleep well, {name}}
      3 {Rise and shine, {name}}
      4 {Rise and shine, {name}}
      5 {Rise and shine, {name}}
      6 {Good morning, {name}}
      7 {Good morning, {name}}
      8 {Good morning, {name}}
      9 {Good morning, {name}}
      10 {Hello, {name}}
      11 {Hello, {name}}
      12 {Hello, {name}}
      13 {Hello, {name}}
      14 {Good afternoon, {name}}
      15 {Good afternoon, {name}}
      16 {Good afternoon, {name}}
      17 {Good afternoon, {name}}
      18 {Good evening, {name}}
      19 {Good evening, {name}}
      20 {Good evening, {name}}
      21 {Good evening, {name}}
      22 {Good night, {name}}
      23 {Good night, {name}}
    }`,
    description: 'Greetings per time of day with names',
  },
});
