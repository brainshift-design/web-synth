import Handle from '../components/Handle';
import Parameter from '../parameters/Parameter';
import { ConnectionType } from './ConnectionType';
import { PortType } from './PortType';

export type ConnectHandler    = (port: Port) => void;
export type DisconnectHandler = (port: Port) => void;

export interface PortProps
{
    id:              string;
    type:            PortType;
    connectionType:  ConnectionType;
    node?:           Node;
    parameter?:      Parameter;
    onConnect?:      ConnectHandler    | null;
    onDisconnect?:   DisconnectHandler | null;
}


export default abstract class Port
{
    readonly id:             string;
    readonly type:           PortType;
    readonly connectionType: ConnectionType;
    
    node:         Node              | null;
    parameter:    Parameter         | null;

    onConnect:    ConnectHandler    | null;
    onDisconnect: DisconnectHandler | null;


    constructor(props: PortProps)
    {
        this.id             = props.id;
        this.type           = props.type;
        this.connectionType = props.connectionType;
        this.node           = props.node         || null;
        this.parameter      = props.parameter    || null;
        this.onConnect      = props.onConnect    || null;
        this.onDisconnect   = props.onDisconnect || null;
    }


    render(): React.ReactNode
    {
        return (
            <Handle
                id   = {this.id}
                port = {this}
            />
        )
    }
}