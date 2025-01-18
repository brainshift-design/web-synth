import Input from '../connections/Input';
import Output from '../connections/Output';
import { ParameterType } from './ParameterType';

export interface ParameterProps
{
    id:       string;
    name?:    string | '';
    type:     ParameterType;
    input?:   Input  | null;
    output?:  Output | null;
}

export default abstract class Parameter
{
    readonly id: string;

    name:   string;

    input:  Input  | null;
    output: Output | null;

    constructor(props: ParameterProps)
    {
        this.id     = props.id;
        this.name   = props.name   || '';
        this.input  = props.input  || null;
        this.output = props.output || null;
    }

    render(): React.ReactNode
    {
        return (
            <div>
                {this.input && this.input.render()}
                {this.renderControls()}
                {this.output && this.output.render()}
            </div>
        );
    }

    abstract renderControls(): React.ReactNode;
}