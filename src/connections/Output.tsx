import Port, { PortProps } from './Port';
import { PortType } from './PortType';

export default class Output extends Port
{
    constructor(props: PortProps)
    {
        super({
            ...props, 
            type: PortType.Output
        });
    }
}
