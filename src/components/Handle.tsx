import { CSSProperties, useContext, useEffect, useRef } from 'react';
import { ClassContext } from '../contexts/ClassContext';
import handleStyles from './Handle.module.css';
import Port from '../connections/Port';

export interface HandleProps
{
    id:     string;
    port:   Port;    
    style?: CSSProperties;
}

export default function Handle(props: HandleProps) 
{
    const context = useContext(ClassContext);
    const handleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (handleRef.current) handleRef.current.dataset.handletype = props.port.connectionType;
    }, [props.port.connectionType]);

    const handleConnected = context?.edges.some(
        (edge) => edge.target == props.port.node?.id && edge.targetHandle == props.id
    );

    const handleColor = getHandleColor(props.port.connectionType);

    return (
        <Handle
            {...props}
            ref       = {handleRef}
            className = {handleStyles.inputHandle}
            style={{
                ...props.style,
                background: handleConnected
                    ? `radial-gradient(${getWireColor(props.port.connectionType)} 35%, #000 50%)`
                    : 'var(--handle-inside-disconnected)',
                boxShadow: 'var(--handle-shadow), 0 0 0 7px ' + handleColor,
            }}
        />
    );
}
