import Port from '../connections/Port';
import Graph from '../graph/Graph';
import Parameter from '../parameters/Parameter';
import { Node as ReactFlowNode } from 'reactflow';
import { getTypeName } from './utils';
import { PortType } from '../connections/PortType';


export interface NodeProps
{
    id:     string;
    graph?: Graph | null;
}


export default abstract class Node
{
    readonly id: string;
    
    graph:      Graph | null;

    parameters: Parameter[] = [];
    ports:      Port[]      = [];

    get allPorts()
    {
        const ports = [];

        for (const param of this.parameters)
        {
            if (param.input) ports.push(param.input);
            if (param.output) ports.push(param.output);
        }
        
        return ports;
    }
    

    constructor(props: NodeProps)
    {
        this.id    = props.id;
        this.graph = props.graph || null;
    }


    addParameter(parameter: Parameter)
    {
        this.parameters.push(parameter);
    }


    removeParameter(id: string)
    {
        const index = this.parameters.findIndex(param => param.id === id);
        if (index !== -1) this.parameters.splice(index, 1);
    }


    getParameter(id: string)
    {
        return this.parameters.find(param => param.id === id);
    }


    createReactFlowNode(): ReactFlowNode
    {
        return {
            id:               this.id,
            type:             getTypeName(this.constructor as typeof Node),
            position:         { x: 0, y: 0 },
            data:             {},
            positionAbsolute: { x: 0, y: 0 }
        };
    }


    render(): React.ReactNode
    {
        return (
            <div>
                {this.renderInputPorts()}
                {this.renderParameters()}
                {this.renderOutputPorts()}
            </div>
        );
    }


    renderInputPorts(): React.ReactNode
    {
        return (
            <>
                {this.ports.filter(port => port.type === PortType.Input).map(port => port.render())}
            </>
        );
    }


    renderOutputPorts(): React.ReactNode
    {
        return (
            <>
                {this.ports.filter(port => port.type === PortType.Output).map(port => port.render())}
            </>
        );
    }


    renderParameters(): React.ReactNode
    {
        return (
            <>
                {this.parameters.map(param => param.render())}
            </>
        );
    }
}