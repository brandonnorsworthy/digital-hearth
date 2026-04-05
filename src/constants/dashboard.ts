export const QUIET_PHRASES = [
  { text: 'The house is quiet.', emphasis: 'quiet' },
  { text: 'All caught up.', emphasis: 'caught up' },
  { text: 'Nothing on the list.', emphasis: 'Nothing' },
  { text: 'Smooth sailing today.', emphasis: 'Smooth sailing' },
  { text: 'Everything is taken care of.', emphasis: 'taken care of' },
]

export const BUSY_PHRASES_ONE = [
  { text: 'One thing needs attention.', emphasis: 'attention' },
  { text: 'Just one thing to handle.', emphasis: 'one thing' },
  { text: 'Almost clear — one left.', emphasis: 'one left' },
]

export const BUSY_PHRASES_MANY = [
  (n: number) => ({ text: `${n} things need attention.`, emphasis: 'attention' }),
  (n: number) => ({ text: `${n} things on the list.`, emphasis: 'on the list' }),
  (n: number) => ({ text: `${n} things to take care of.`, emphasis: 'take care of' }),
  (n: number) => ({ text: `Looks like ${n} things need doing.`, emphasis: `${n} things` }),
  (n: number) => ({ text: `${n} things are waiting.`, emphasis: 'waiting' }),
]
