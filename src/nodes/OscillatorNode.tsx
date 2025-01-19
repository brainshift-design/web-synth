import AudioOutput from '../connections/AudioOutput';
import NumberParameter from '../parameters/NumberParameter';
import SelectParameter from '../parameters/SelectParameter';
import Node, { NodeProps } from './Node';
import { OscillatorWaveform } from './OscillatorWaveform';
import { freqCurvePower, getValueCurve, invValueCurve } from './utils';


export interface OscillatorNodeProps extends NodeProps
{
    waveform:  string;
    frequency: number;
}


export default class OscillatorNode extends Node
{
    waveform:    SelectParameter;
    frequency:   NumberParameter;

    audioOutput: AudioOutput;


    constructor(props: OscillatorNodeProps)
    {
        super({ ...props, name: 'Oscillator' });


        this.addOutput(this.audioOutput = new AudioOutput({ id: 'audio-output' }));


        this.addParameter(this.waveform = new SelectParameter({
            id:       'waveform',
            name:     'Wave',
            options:  Object.values(OscillatorWaveform),
            value:    Object.values(OscillatorWaveform).indexOf(OscillatorWaveform.Sine),
            onChange: () => {},
        }));
        

        this.addParameter(this.frequency = new NumberParameter({
            id:             'frequency',
            name:           'Freq | Hz',
            value:          invValueCurve(440),
            min:            20,
            max:            20000,
            getCurvedValue: (val) => getValueCurve(val, 20, 20000, freqCurvePower, (v) => v    ),
            getCurvedTick:  (val) => getValueCurve(val, 0,  1,     freqCurvePower, (v) => 1 - v),      
            ticks:          49,
            onChange:       () => {},
            knobColor:      "var(--color-node-highlight)",
            valueColor:     "var(--color-node-highlight-value)"
        }));
    }
}
