import SelectKnob from '../components/SelectKnob';
import Parameter, { ParameterProps } from './Parameter';
import { ParameterType } from './ParameterType';


export interface SelectParameterProps extends Omit<ParameterProps, 'type'>
{
    options:     string[];
    value:       number;
    onChange?:   (e: React.ChangeEvent<HTMLInputElement>) => void;
    knobColor?:  string;
    valueColor?: string;
}


export default class SelectParameter extends Parameter
{
    options:    string[];
    value:      number;
    onChange:   ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    knobColor:  string | undefined;
    valueColor: string | undefined;

    
    constructor(props: SelectParameterProps)
    {
        super({
            ...props,
            type: ParameterType.Select
        });

        this.options    = props.options;
        this.value      = props.value;
        this.onChange   = props.onChange;
        this.knobColor  = props.knobColor;
        this.valueColor = props.valueColor;
    }


    renderControls(): React.ReactNode
    {
        return (
            <SelectKnob
                label      = {this.name}
                options    = {this.options.map(option => ({ value: option, label: option }))}
                value      = {this.value}
                onChange   = {this.onChange}
                knobColor  = {this.knobColor}
                valueColor = {this.valueColor}
            />
        );
    }
}