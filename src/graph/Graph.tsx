import Connection from '../connections/Connection';
import Input from '../connections/Input';
import Output from '../connections/Output';
import Node from '../nodes/Node';
import { Node as ReactFlowNode, Edge } from 'reactflow';


export default class Graph
{
    nodes:       Node[];
    connections: Connection[];
    onNodesChanged?: () => void;


    get reactNodes(): ReactFlowNode[] { return this.nodes      .map(node => node.reactNode); }
    get reactEdges(): Edge[]          { return this.connections.map(conn => conn.reactEdge); }

    set reactNodes(nodes: ReactFlowNode[]) 
    {
        // when ReactFlow updates nodes, we need to update our nodes
        nodes.forEach(reactNode => 
        {
            const node = this.nodes.find(n => n.id === reactNode.id);
            if (node) node.reactNode = reactNode;
        });
    }

    set reactEdges(edges: Edge[]) 
    {
        // when ReactFlow updates edges, we need to update our connections
        edges.forEach(edge => 
        {
            const connection = this.connections.find(conn => conn.reactEdge.id === edge.id);
            if (connection) connection.reactEdge = edge;
        });
    }


    constructor()
    {
        this.nodes       = [];
        this.connections = [];
    }


    createNode(node: Node, position: { x: number, y: number })
    {
        node.reactNode.position         = position;
        node.reactNode.positionAbsolute = position;

        this.addNode(node);
    }


    addNode(node: Node, position: { x: number, y: number } | null = null)
    {
        node.graph = this;

        if (position)
        {
            node.reactNode.position         = position;
            node.reactNode.positionAbsolute = position;
        }

        this.nodes.push(node);
        this.onNodesChanged?.();
    }


    removeNode(id: string)
    {
        const node = this.getNode(id);
        if (!node) return null;
        
        this.connections = this.connections.filter(conn => 
               conn.input .node?.id !== id 
            && conn.output.node?.id !== id
        );

        node.graph = null;
        this.nodes.splice(this.nodes.indexOf(node), 1);
        this.onNodesChanged?.();

        return node;
    }


    getNode(id: string)
    {
        return this.nodes.find(node => node.id === id);
    }    
    

    addConnection(input: Input, output: Output)
    {
        const connection = new Connection(output, input);
        this.connections.push(connection);
    }    


    removeConnection(input: Input, output: Output)
    {
        this.connections = this.connections.filter(connection => 
               connection.input  !== input 
            && connection.output !== output);
    }

    
    getConnection(inputId: string, outputId: string)
    {
        return this.connections.find(connection => 
               connection.input .id === inputId 
            && connection.output.id === outputId);
    }      
}
