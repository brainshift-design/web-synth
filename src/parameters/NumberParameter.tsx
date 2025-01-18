import NumberKnob from '../components/NumberKnob';
import Parameter, { ParameterProps } from './Parameter';
import { ParameterType } from './ParameterType';


export interface NumberParameterProps extends Omit<ParameterProps, 'type'>
{
    value: number;
    min:   number;
    max:   number;
}


export default class NumberParameter extends Parameter
{
    value: number;
    min:   number;
    max:   number;


    constructor(props: NumberParameterProps)
    {
        super({
            ...props,
            type: ParameterType.Number
        });

        this.value = props.value;
        this.min   = props.min;
        this.max   = props.max;
    }


    renderControls(): React.ReactNode
    {
        return (
            <NumberKnob 
                label = {this.name} 
                value = {this.value} 
                min   = {this.min}
                max   = {this.max}
            />
        );
    }
}