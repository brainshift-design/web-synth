import Output from './Output';
import Input from './Input';

export default class Connection
{
    output: Output;
    input:  Input;

    constructor(output: Output, input: Input)
    {
        this.output = output;
        this.input  = input;
    }
}