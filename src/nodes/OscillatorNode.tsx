import NumberParameter from '../parameters/NumberParameter';
import SelectParameter from '../parameters/SelectParameter';
import Node, { NodeProps } from './Node';
import { OscillatorWaveform } from './OscillatorWaveform';


export interface OscillatorNodeProps extends NodeProps
{
    waveform:  string;
    frequency: number;
}


export default class OscillatorNode extends Node
{
    waveform:  SelectParameter;
    frequency: NumberParameter;


    constructor(props: OscillatorNodeProps)
    {
        super(props);

        this.addParameter(this.waveform = new SelectParameter({
            id:      'waveform',
            name:    'Waveform',
            options: Object.values(OscillatorWaveform),
            value:   Object.values(OscillatorWaveform).indexOf(OscillatorWaveform.Sine)
        }));
        
        this.addParameter(this.frequency = new NumberParameter({
            id:    'frequency',
            name:  'Frequency',
            value: 440,
            min:   20,
            max:   20000
        }));
    }
}
