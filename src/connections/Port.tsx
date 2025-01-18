import Parameter from '../parameters/Parameter';
import { ConnectionType } from './ConnectionType';
import { PortType } from './PortType';

export type ConnectHandler    = (port: Port) => void;
export type DisconnectHandler = (port: Port) => void;

export interface PortOptions
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
    
    node:         Node;
    parameter:    Parameter;

    onConnect:    ConnectHandler    | null;
    onDisconnect: DisconnectHandler | null;


    constructor(options: PortOptions)
    {
        this.id             = options.id;
        this.type           = options.type;
        this.connectionType = options.connectionType;
        this.node           = options.node!;
        this.parameter      = options.parameter!;
        this.onConnect      = options.onConnect!;
        this.onDisconnect   = options.onDisconnect!;
    }
}