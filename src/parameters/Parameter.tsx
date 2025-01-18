import Input from '../connections/Input';
import Output from '../connections/Output';
import { ParameterType } from './ParameterType';

export interface ParameterOptions
{
    id:      string;
    type:    ParameterType;
    input?:  Input  | null;
    output?: Output | null;
}

export default abstract class Parameter
{
    readonly id: string;

    input:  Input  | null;
    output: Output | null;

    constructor(options: ParameterOptions)
    {
        this.id     = options.id;
        this.input  = options.input!;
        this.output = options.output!;
    }
}