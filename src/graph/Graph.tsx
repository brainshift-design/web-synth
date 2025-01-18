import Connection from '../connections/Connection';
import Input from '../connections/Input';
import Output from '../connections/Output';
import Node from '../nodes/Node';

export default class Graph
{
    nodes:       Node[];
    connections: Connection[];

    constructor()
    {
        this.nodes       = [];
        this.connections = [];
    }

    addNode(node: Node)
    {
        this.nodes.push(node);
    }

    removeNode(id: string)
    {
        this.nodes = this.nodes.filter(node => node.id !== id);
    }

    getNode(id: string)
    {
        return this.nodes.find(node => node.id === id);
    }    
    
    addConnection(input: Input, output: Output)
    {
        this.connections.push(new Connection(output, input));
    }    
    
    removeConnection(inputId: string, outputId: string)
    {
        this.connections = this.connections.filter(connection => 
            connection.input.id !== inputId 
            && connection.output.id !== outputId);
    }

    getConnection(inputId: string, outputId: string)
    {
        return this.connections.find(connection => 
            connection.input.id === inputId 
            && connection.output.id === outputId);
    }      
}
