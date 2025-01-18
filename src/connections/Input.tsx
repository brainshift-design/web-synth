import Port, { PortProps } from './Port';
import { PortType } from './PortType';

export default class Input extends Port
{
    constructor(props: PortProps)
    {
        super({
            ...props, 
            type: PortType.Input
        });
    }
}
