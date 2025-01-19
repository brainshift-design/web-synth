import { useCallback, useContext } from 'react';
import { Connection, Edge, Node, OnConnect, OnEdgesChange, OnNodesChange, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { ClassContext } from '../contexts/ClassContext';

export function useFlowState() 
{
    const context = useContext(ClassContext);
    if (!context) throw new Error('useFlowState must be used within a ClassProvider');

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => {
            const updatedNodes = applyNodeChanges(changes, context.nodes);
            // Update positions in the graph's reactNodes
            context.graph.reactNodes = updatedNodes;
        },
        [context]
    );

    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => context.setEdges((edges) => applyEdgeChanges(changes, edges)),
        [context]
    );

    const onConnect: OnConnect = useCallback(
        (connection: Connection) => context.setEdges((edges) => addEdge(connection, edges)),
        [context]
    );

    const removeNodes = useCallback(
        (nodes: Node[]) => {
            const nodeIds = nodes.map((node) => node.id);
            nodeIds.forEach(id => context.graph.removeNode(id));
            context.setEdges((edges) => edges.filter((edge) => 
                !nodeIds.includes(edge.source) && !nodeIds.includes(edge.target)
            ));
        },
        [context]
    );

    const removeEdges = useCallback(
        (edges: Edge[]) => {
            const edgeIds = edges.map((edge) => edge.id);
            context.setEdges((edges) => edges.filter((edge) => !edgeIds.includes(edge.id)));
        },
        [context]
    );

    return { onNodesChange, onEdgesChange, onConnect, removeNodes, removeEdges };
} 