import { ConnectionType } from './ConnectionType';
import Output from './Output';
import { PortProps } from './Port';


export default class DataOutput extends Output
{
    constructor(props: Partial<PortProps>)
    {
        super({
            ...props,
            connectionType: ConnectionType.Audio
        } as PortProps);
    }
} 