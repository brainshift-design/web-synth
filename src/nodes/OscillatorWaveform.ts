export const OscillatorWaveform = 
{
    Sine:     'sine',
    Square:   'square',
    Sawtooth: 'sawtooth',
    Triangle: 'triangle'
} as const;

export type OscillatorWaveform = typeof OscillatorWaveform[keyof typeof OscillatorWaveform];