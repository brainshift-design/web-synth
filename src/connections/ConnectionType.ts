export const ConnectionType = 
{
    Audio:   'audio',
    Control: 'output',
    Data:    'data',
} as const;

export type ConnectionType = typeof ConnectionType[keyof typeof ConnectionType];