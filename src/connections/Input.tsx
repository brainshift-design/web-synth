import Port, { PortOptions } from './Port';
import { PortType } from './PortType';

export default class Input extends Port
{
    constructor(options: PortOptions)
    {
        super({
            ...options, 
            type: PortType.Input
        });
    }
}
