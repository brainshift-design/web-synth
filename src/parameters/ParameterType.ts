export const ParameterType = 
{
    Number: 'number',
    Select: 'select',
    Toggle: 'toggle',
} as const;

export type ParameterType = typeof ParameterType[keyof typeof ParameterType];