import Parameter, { ParameterOptions } from './Parameter';

export default class NumberParameter extends Parameter
{
    constructor(options: ParameterOptions)
    {
        super({
            ...options,
            
        });
    }
}