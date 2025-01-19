import Output from './Output';
import Input from './Input';
import { Edge } from 'reactflow';

export default class Connection
{
    output:    Output;
    input:     Input;

    reactEdge: Edge;

    
    constructor(output: Output, input: Input)
    {
        this.output = output;
        this.input  = input;
        
        this.reactEdge = {
            id:           `${output.node?.id}.${output.id}-${input.node?.id}.${input.id}`,
            source:       output.node?.id ?? '',
            target:       input .node?.id ?? '',
            sourceHandle: output.id,
            targetHandle: input .id
        };
    }
}