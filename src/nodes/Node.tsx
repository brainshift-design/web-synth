import styles from './Node.module.css';
import Port from '../connections/Port';
import Graph from '../graph/Graph';
import Parameter from '../parameters/Parameter';
import { Node as ReactFlowNode, NodeProps as ReactFlowNodeProps } from 'reactflow';
import { getTypeName } from './utils';
import { PortType } from '../connections/PortType';
import { createId } from '../utils';


export interface NodeProps
{
    id?:    string | null;
    graph?: Graph | null;
}


export default abstract class Node
{
    readonly id: string;
    
    graph:      Graph | null;
    
    parameters: Parameter[] = [];
    ports:      Port[]      = [];
    
    reactNode:  ReactFlowNode;


    get allPorts()
    {
        const ports = [...this.ports]

        for (const param of this.parameters)
        {
            if (param.input ) ports.push(param.input );
            if (param.output) ports.push(param.output);
        }
        
        return ports;
    }
    

    constructor(props: NodeProps)
    {
        this.id    = props.id ?? createId();
        this.graph = props.graph || null;
        
        this.reactNode = this.createReactFlowNode();
    }


    addParameter(parameter: Parameter)
    {
        this.parameters.push(parameter);
    }


    removeParameter(id: string)
    {
        const index = this.parameters.findIndex(param => param.id === id);
        
        return index > -1
            ? this.parameters.splice(index, 1)
            : null;
    }


    getParameter(id: string)
    {
        return this.parameters.find(param => param.id === id);
    }


    static Component<T extends Node>({ data }: ReactFlowNodeProps<{ node: T }>) 
    {
        return data.node.render();
    }


    createReactFlowNode(): ReactFlowNode
    {
        return {
            id:               this.id,
            type:             this.constructor.name.toLowerCase(),
            position:         { x: Math.random() * 500, y: Math.random() * 300 },
            data:             { node: this },
            positionAbsolute: { x: Math.random() * 500, y: Math.random() * 300 }
        };
    }


    render(): React.ReactNode
    {
        return (
            <div className={styles.node}>
                <h1>{getTypeName(this.constructor as typeof Node)}</h1>
                <div className={styles.nodeContent}>
                    {this.renderInputPorts()}
                    {this.renderParameters()}
                    {this.renderOutputPorts()}
                </div>
            </div>
        );
    }


    renderInputPorts(): React.ReactNode
    {
        return (
            <> { 
                this.ports
                    .filter(port => port.type === PortType.Input)
                    .map(port => port.render())
            } </>
        );
    }


    renderOutputPorts(): React.ReactNode
    {
        return (
            <> {
                this.ports
                    .filter(port => port.type === PortType.Output)
                    .map(port => port.render())
            } </>
        );
    }


    renderParameters(): React.ReactNode
    {
        return (
            <> {
                this.parameters
                    .map(param => param.render())
            } </>
        );
    }
}