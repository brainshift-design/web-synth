import Connection from '../connections/Connection';
import OscillatorNode from './OscillatorNode';
import OutputNode from './OutputNode';
import Node from './Node';


export const nodeTypes = 
{
    [OscillatorNode.name.toLowerCase()]: Node.Component,
    [OutputNode    .name.toLowerCase()]: Node.Component,
};


export const reactEdgeTypes = { connection: Connection };