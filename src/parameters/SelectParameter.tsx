import SelectKnob from '../components/SelectKnob';
import Parameter, { ParameterProps } from './Parameter';
import { ParameterType } from './ParameterType';

export interface SelectParameterProps extends Omit<ParameterProps, 'type'>
{
    options: string[];
    value:   number;
}

export default class SelectParameter extends Parameter
{
    options: string[];
    value:   number;
    
    constructor(props: SelectParameterProps)
    {
        super({
            ...props,
            type: ParameterType.Select
        });

        this.options = props.options;
        this.value   = props.value;
    }

    renderControls(): React.ReactNode
    {
        return (
            <SelectKnob
                label   = {this.name}
                options = {this.options.map(option => ({ value: option, label: option }))}
                value   = {this.value}
            />
        );
    }
}