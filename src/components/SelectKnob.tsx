import knobStyles from './Knob.module.css';
import paramStyles from '../parameters/Parameter.module.css';
import {
    ChangeEvent,
    CSSProperties,
    PointerEvent as ReactPointerEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Tau } from '../utils';
import InputDisplay from './InputDisplay';
import { KnobProps } from './Knob';


interface SelectKnobProps extends KnobProps
{
    value:   number;
    options: { value: string; label: string }[];
}

export function SelectKnob({
    label,
    value,
    options,
    sensitivity     = 0.005,
    knobColor       = '#f4f3f1',
    valueColor      = 'var(--color-node-value)',
    tickSize        = 3,
    tickDistance    = 27,
    adjustTickX     = -1,   // these are for manual
    adjustTickY     = 0,    // adjustment of ticks
    adjustTickAngle = 0.05, // because of CSS pixel grid issues
    onChange,
}: SelectKnobProps) 
{
    const step        = Tau/10;
    const spread      = step * (options.length-1);

    const minAngle    = -spread/2;
    const maxAngle    =  spread/2;

    const inputRef    = useRef<HTMLInputElement>(null);
    const onChangeRef = useRef(onChange);

    const [knobValue, setKnobValue] = useState(value);
    const [oldValue, setOldValue] = useState(value);

    const dragState = useRef({
        isDragging: false,
        startX:     0,
        startValue: 0,
    });

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
        if (onChangeRef.current && knobValue != oldValue) {
            onChangeRef.current({
                target: { value: knobValue.toString() },
            } as ChangeEvent<HTMLInputElement>);
        }

        setOldValue(knobValue);
    }, [knobValue, oldValue]);

    const onPointerMove = useCallback(
        (e: globalThis.PointerEvent) => {
            if (!dragState.current.isDragging) return;

            const delta = (e.clientX - dragState.current.startX) * sensitivity;

            const newValue = Math.min(
                Math.max(0, Math.round(dragState.current.startValue + delta * options.length)),
                options.length - 1
            );

            setKnobValue(newValue);
        },
        [options.length, sensitivity]
    );

    const onPointerUp = useCallback(
        (e: globalThis.PointerEvent) => {
            dragState.current.isDragging = false;

            globalThis.removeEventListener('pointermove', onPointerMove);
            globalThis.removeEventListener('pointerup', onPointerUp);

            inputRef.current?.releasePointerCapture(e.pointerId);
        },
        [onPointerMove]
    );

    const onPointerDown = useCallback(
        (e: ReactPointerEvent<HTMLInputElement>) => {
            if (e.button != 0) return;

            e.preventDefault();

            dragState.current = {
                isDragging: true,
                startX:     e.clientX,
                startValue: knobValue,
            };

            globalThis.addEventListener('pointermove', onPointerMove);
            globalThis.addEventListener('pointerup', onPointerUp);

            inputRef.current?.setPointerCapture(e.pointerId);
        },
        [knobValue, onPointerMove, onPointerUp]
    );

    const valueAngle = minAngle + (knobValue / (options.length - 1)) * (maxAngle - minAngle);

    const nTicks = options.length;

    const tickAngle = (index: number) =>
        minAngle + (index / (nTicks - 1)) * (maxAngle - minAngle) + adjustTickAngle;

    const [name, unit] = label.split('|');

    return (
        <div
            className={`${paramStyles.parameter} ${knobStyles.knobContainer}`}
            data-knob-color={knobColor}
            data-value-color={valueColor}
            style={
                {
                    '--knob-color':       knobColor,
                    '--knob-value-color': valueColor,
                } as CSSProperties
            }
        >
            <InputDisplay 
                text = {options.find((_, index) => index == knobValue)!.label}
            />

            <div className={knobStyles.infoContainer}>
                {Array.from({ length: nTicks }).map((_, index) => (
                    <div
                        key={index}
                        className={knobStyles.knobTick}
                        style={{
                            height:    `${tickSize}px`,
                            transform: `translate(${adjustTickX}px, ${adjustTickY}px) rotate(${tickAngle(index)}rad) translate(-50%, -${tickDistance}px)`,
                        }}
                    ></div>
                ))}

                <div className={knobStyles.inputContainer}>
                    <div
                        className={knobStyles.knob}
                        ref={inputRef}
                        onPointerDown={onPointerDown}
                        onChange={onChange}
                    ></div>

                    <div
                        className={knobStyles.knobValue}
                        style={{ transform: `rotate(${valueAngle}rad)` }}
                    ></div>
                </div>
            </div>

            <h2 className={knobStyles.name}>
                {name != '_' && <span className={knobStyles.knobName}>{name}</span>}
                {/* eslint-disable-next-line no-irregular-whitespace */}
                {name != '_' && unit && <span> · </span>}
                <span className={knobStyles.knobUnit}>{unit}</span>
            </h2>
        </div>
    );
}

export default SelectKnob;
