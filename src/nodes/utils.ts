import { ConnectionType } from '../connections/ConnectionType';
import Node from './Node';
import { NodeProps } from './Node';
import { nodeTypes } from '.';


export const freqCurvePower = 4.5; // distributes the frequency better for control


export function getTypeName<T extends NodeProps>(
    Class: abstract new (props: T) => Node
): string 
{
    const found = Object.entries(nodeTypes).find(([, cls]) => cls === (Class as unknown));

    return found?.[0] as string;
}


export function getValueCurve(
    val:   number,
    min:   number,
    max:   number,
    power: number,
    prep:  (v: number) => number = (_v: number) => _v
) {
    return min + prep(((val - min) / (max - min)) ** power) * (max - min);
}


export function invValueCurve(freq: number) 
{
    return getValueCurve(freq, 20, 20000, 1/freqCurvePower);
}


export function getHandleColor(handletype: ConnectionType) 
{
    switch (handletype) 
    {
    case ConnectionType.Audio:   return '#5af';
    case ConnectionType.Control: return '#fc0';
    case ConnectionType.Data:    return '#fca';
    }
}


export function getWireColor(handletype: ConnectionType) 
{
    switch (handletype) 
    {
    case ConnectionType.Audio:   return '#2292ff';
    case ConnectionType.Control: return '#fc0';
    case ConnectionType.Data:    return '#f44';
    }
}


export function getSelectedWireColor(handletype: ConnectionType) 
{
    switch (handletype) 
    {
    case ConnectionType.Audio:   return '#09f8';
    case ConnectionType.Control: return '#fc08';
    case ConnectionType.Data:    return '#f448';
    }
}