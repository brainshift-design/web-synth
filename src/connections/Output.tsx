import Port, { PortOptions } from './Port';
import { PortType } from './PortType';

export default class Output extends Port
{
    constructor(options: PortOptions)
    {
        super({
            ...options, 
            type: PortType.Output
        });
    }
}
