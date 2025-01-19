import { ChangeEventHandler } from "react";


export interface KnobProps
{
    label:            string;
    sensitivity?:     number;
    knobColor?:       string;
    valueColor?:      string;
    minAngle?:        number;
    maxAngle?:        number;
    tickSize?:        number;
    tickDistance?:    number;
    adjustTickX?:     number;
    adjustTickY?:     number;
    adjustTickAngle?: number;
    onChange?:        ChangeEventHandler<HTMLInputElement>;
}
