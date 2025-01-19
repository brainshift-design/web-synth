import { ReactElement, useContext } from 'react';
import PanelButton from './PanelButton';
import Separator from './Separator';
import { OscillatorWaveform } from '../nodes/OscillatorWaveform';
import { ClassContext } from '../contexts/ClassContext';
import OscillatorNode from '../nodes/OscillatorNode';
import { useReactFlow } from 'reactflow';


export default function ToolbarButtons(): ReactElement 
{
    const context = useContext(ClassContext);
    const { screenToFlowPosition } = useReactFlow();
    if (!context) throw new Error('ToolbarButtons must be used within a ClassProvider');

    return (
        <>
            <PanelButton>
                <i className="material-icons">menu</i>
            </PanelButton>

            <Separator />

            <PanelButton 
                onClick={() => {
                    const position = screenToFlowPosition({ x: 100, y: 100 });
                    context.graph.addNode(
                        new OscillatorNode({ 
                            waveform:  OscillatorWaveform.Sine, 
                            frequency: 440 
                        }),
                        position
                    );
                }}
                onDragEnd={(position) => {
                    const flowPosition = screenToFlowPosition(position);
                    context.graph.addNode(
                        new OscillatorNode({ 
                            waveform:  OscillatorWaveform.Sine, 
                            frequency: 440 
                        }),
                        flowPosition
                    );
                }}>
                Osc
            </PanelButton>
        </>
    );
}
