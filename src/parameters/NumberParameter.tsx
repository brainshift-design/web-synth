import NumberKnob from '../components/NumberKnob';
import Parameter, { ParameterProps } from './Parameter';
import { ParameterType } from './ParameterType';


export interface NumberParameterProps extends Omit<ParameterProps, 'type'>
{
    value:           number;
    min:             number;
    max:             number;
    getCurvedValue?: (val: number) => number;
    getCurvedTick?:  (val: number) => number;
    ticks?:          number;
    onChange?:       (e: React.ChangeEvent<HTMLInputElement>) => void;
    knobColor?:      string;
    valueColor?:     string;
}


export default class NumberParameter extends Parameter
{
    value:          number;
    min:            number;
    max:            number;
    getCurvedValue: ((val: number) => number) | undefined;
    getCurvedTick:  ((val: number) => number) | undefined;
    ticks:          number | undefined;
    onChange:       ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    knobColor:      string | undefined;
    valueColor:     string | undefined;


    constructor(props: NumberParameterProps)
    {
        super({
            ...props,
            type: ParameterType.Number
        });

        this.value          = props.value;
        this.min            = props.min;
        this.max            = props.max;
        this.getCurvedValue = props.getCurvedValue;
        this.getCurvedTick  = props.getCurvedTick;
        this.ticks          = props.ticks;
        this.onChange       = props.onChange;
        this.knobColor      = props.knobColor;
        this.valueColor     = props.valueColor;
    }


    renderControls(): React.ReactNode
    {
        return (
            <NumberKnob 
                label          = {this.name} 
                value          = {this.value} 
                min            = {this.min}
                max            = {this.max}
                getCurvedValue = {this.getCurvedValue}
                getCurvedTick  = {this.getCurvedTick}
                ticks          = {this.ticks}
                onChange       = {this.onChange}
                knobColor      = {this.knobColor}
                valueColor     = {this.valueColor}
            />
        );
    }
}