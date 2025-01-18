export const PortType = {
    Input:  'Input',
    Output: 'Output'
} as const;

export type PortType = typeof PortType[keyof typeof PortType];