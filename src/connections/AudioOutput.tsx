import Output from './Output';
import { PortProps } from './Port';
import { ConnectionType } from './ConnectionType';


export default class AudioOutput extends Output
{
    constructor(props: Partial<PortProps>)
    {
        super({
            ...props,
            connectionType: ConnectionType.Audio
        } as PortProps);
    }
} 