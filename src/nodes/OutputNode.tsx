import AudioInput from '../connections/AudioInput';
import Node, { NodeProps } from './Node';


export default class OutputNode extends Node
{
    audioInput: AudioInput;


    constructor(props: NodeProps)
    {
        super({ ...props, name: 'Output' });

        this.addInput(this.audioInput = new AudioInput({ id: 'audio-input' }));
    }
}