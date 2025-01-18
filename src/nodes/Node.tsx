import Port from '../connections/Port';
import Graph from '../graph/Graph';
import Parameter from '../parameters/Parameter';

export default abstract class Node
{
    readonly id: string;
    
    graph: Graph;

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
    

    constructor(id: string, graph: Graph)
    {
        this.id    = id;
        this.graph = graph;
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
}