import 'reactflow/dist/style.css';
import styles from './GraphView.module.css';
import { useContext } from 'react';
import ReactFlow, { Background } from 'reactflow';
import useFlowState from '../hooks/useFlowState';
import { ClassContext } from '../contexts/ClassContext';
import ConnectingWire from './ConnectingWire';
import { nodeTypes } from '../nodes';

export default function GraphView() {
    const nodeContext = useContext(ClassContext);
    const { onNodesChange, onEdgesChange, onConnect, removeNodes, removeEdges } = useFlowState();

    return (
        <div 
            className={styles.graphView} 
            onDragStart={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
        >
            <ReactFlow
                nodes              = {nodeContext?.nodes}
                edges              = {nodeContext?.edges}
                nodeTypes          = {nodeTypes}
                draggable          = {false}
                nodesDraggable     = {true}
                nodesConnectable   = {true}
                elementsSelectable = {true}
                selectNodesOnDrag  = {false}
                panOnDrag          = {[1, 2]}
                fitView
                connectionLineComponent={ConnectingWire}
                deleteKeyCode      = {['Delete', 'Backspace']}
                onNodesChange      = {onNodesChange}
                onNodesDelete      = {removeNodes}
                onEdgesChange      = {onEdgesChange}
                onEdgesDelete      = {removeEdges}
                onConnect          = {onConnect}
                onDragOver         = {(event) => { event.preventDefault(); }}
                onDrop             = {(event) => { event.preventDefault(); }}
                minZoom            = {0.25}
                maxZoom            = {16}
            >
                <Background />
            </ReactFlow>
        </div>
    );
}
