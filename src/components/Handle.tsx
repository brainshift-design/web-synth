import styles from './Handle.module.css';
import { CSSProperties, useContext, useEffect, useRef } from 'react';
import { ClassContext } from '../contexts/ClassContext';
import Port from '../connections/Port';
import { getHandleColor, getWireColor } from '../nodes/utils';


export interface HandleProps
{
    id:         string;
    port:       Port;    
    style?:     CSSProperties;
    className?: string;
}


export default function Handle(props: HandleProps) 
{
    const context   = useContext(ClassContext);
    const handleRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (handleRef.current) handleRef.current.dataset.handletype = props.port.connectionType;
    }, [props.port.connectionType]);


    const handleConnected = context?.edges.some((edge) => 
           edge.target       == props.port.node?.id 
        && edge.targetHandle == props.id
    );


    const handleColor = getHandleColor(props.port.connectionType);

    
    return (
        <div
            {...props}
            ref       = {handleRef}
            className = {`${styles.handle} ${props.className || ''}`}
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
