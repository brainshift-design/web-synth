import { ReactElement, useContext } from 'react';
import PanelButton from './PanelButton';
import Separator from './Separator';
import { OscillatorWaveform } from '../nodes/OscillatorWaveform';
import { ClassContext } from '../contexts/ClassContext';
import OscillatorNode from '../nodes/OscillatorNode';
import { useReactFlow } from 'reactflow';
import OutputNode from '../nodes/OutputNode';
import Node from '../nodes/Node';


export default function ToolbarButtons(): ReactElement 
{
    const context = useContext(ClassContext);
    const { screenToFlowPosition } = useReactFlow();
    if (!context) throw new Error('ToolbarButtons must be used within a ClassProvider');

    const createNodeButton = <T extends Node, P extends object>(NodeClass: new (props: P) => T, props: P) => 
    ({
        onClick: () => 
            context.graph.addNode(
                new NodeClass(props), 
                screenToFlowPosition({ x: 100, y: 100 })),

        onDragEnd: (position: {x: number, y: number}) => 
            context.graph.addNode(
                new NodeClass(props), 
                screenToFlowPosition(position))
    });

    return (
        <>
            <PanelButton>
                <i className="material-icons">menu</i>
            </PanelButton>

            <Separator />

            <PanelButton {...createNodeButton(OscillatorNode, { 
                waveform:  OscillatorWaveform.Sine, 
                frequency: 440 
            })}>
                Osc
            </PanelButton>
            
            <PanelButton {...createNodeButton(OutputNode, {})}>
                Out
            </PanelButton>
        </>
    );
}