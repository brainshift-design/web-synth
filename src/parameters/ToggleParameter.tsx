import Toggle from '../components/Toggle';
import Parameter, { ParameterProps } from './Parameter';
import { ParameterType } from './ParameterType';


export interface ToggleParameterProps extends Omit<ParameterProps, 'type'>
{
    value: boolean;
}


export default class ToggleParameter extends Parameter
{
    value: boolean;


    constructor(props: ToggleParameterProps)
    {
        super({
            ...props,
            type: ParameterType.Toggle
        });

        this.value = props.value;
    }


    renderControls(): React.ReactNode
    {
        return (
            <Toggle
                name  = {this.name }
                value = {this.value} 
            />
        );
    }
}   