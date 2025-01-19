export const OscillatorWaveform = 
{
    Sine:     'Sine',
    Square:   'Sqr',
    Sawtooth: 'Saw',
    Triangle: 'Tri'
} as const;

export type OscillatorWaveform = typeof OscillatorWaveform[keyof typeof OscillatorWaveform];