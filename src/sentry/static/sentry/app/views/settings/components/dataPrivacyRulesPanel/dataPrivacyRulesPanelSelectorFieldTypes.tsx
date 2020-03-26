const valueSelectors: Suggestions = [
  {
    type: 'value',
    value: '$string',
    description: 'Any string value',
  },
  {
    type: 'value',
    value: '$number',
    description: 'Any integer or float value',
  },
  {
    type: 'value',
    value: '$datetime',
    description: 'Timestamps and dates',
  },
  {
    type: 'value',
    value: '$array',
    description: 'Any JSON array value',
  },
  {
    type: 'value',
    value: '$object',
    description: 'Any JSON object',
  },
  {
    type: 'value',
    value: '$error',
    description: 'An exception instance',
  },
  {
    type: 'value',
    value: '$stacktrace',
    description: 'A stacktrace instance',
  },
  {
    type: 'value',
    value: '$frame',
    description: 'A stacktrace frame',
  },
  {
    type: 'value',
    value: '$http',
    description: 'HTTP request context',
  },
  {
    type: 'value',
    value: '$user',
    description: 'User context',
  },
  {
    type: 'value',
    value: '$message',
    description: 'The event message'
  },
  {
    type: 'value',
    value: '$thread',
    description: 'A thread instance',
  },
  {
    type: 'value',
    value: '$breadcrumb',
    description: 'A breadcrumb',
  },
  {
    type: 'value',
    value: '$span',
    description: 'A trace span',
  },
  {
    type: 'value',
    value: '$sdk',
    description: 'SDK name and version information',
  },
];

const booleanSelectors: Suggestions = [
  {
    type: 'boolean',
    value: '&&',
  },
  {
    type: 'boolean',
    value: '||',
  },
  {
    type: 'boolean',
    value: '!',
  },
];

const selectors: Suggestions = [...valueSelectors, ...booleanSelectors];

type SuggestionType = 'value' | 'boolean';

export type Suggestions = Array<Suggestion>;
export type Suggestion = {
  type: SuggestionType;
  value: string;
  description?: string;
};

export {selectors, valueSelectors, booleanSelectors};
