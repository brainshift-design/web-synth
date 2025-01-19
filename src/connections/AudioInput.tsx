import { ConnectionType } from './ConnectionType';
import Input from './Input';
import { PortProps } from './Port';


export default class AudioInput extends Input
{
    constructor(props: Partial<PortProps>)
    {
        super({
            ...props,
            connectionType: ConnectionType.Audio
        } as PortProps);
    }
} 