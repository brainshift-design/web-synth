import { CSSProperties, ReactNode, useRef } from 'react';

import styles from './PanelButton.module.css';

interface PanelButtonProps 
{
    children:        ReactNode;
    style?:          CSSProperties;
    onClick?:        () => void;
    onDragEnd?:      (position: { x: number, y: number }) => void;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
}

export default function PanelButton({
    children,
    style,
    onClick,
    onDragEnd,
    onPointerEnter,
    onPointerLeave,
}: PanelButtonProps) 
{
    const dragRef = useRef<{ x: number; y: number } | null>(null);

    return (
        <button
            className = {styles.button}
            style     = {style}
            onClick   = {onClick}
            
            onPointerDown = {(e) => 
            {
                if (e.button !== 0) return;

                e.preventDefault();
                e.currentTarget.setPointerCapture(e.pointerId);
                
                dragRef.current = { x: e.clientX, y: e.clientY };
            }}
            
            onPointerUp = {(e) => 
            {
                if (!dragRef.current) return;

                e.currentTarget.releasePointerCapture(e.pointerId);

                const dx = e.clientX - dragRef.current.x;
                const dy = e.clientY - dragRef.current.y;
                
                if (   Math.abs(dx) > 5 
                    || Math.abs(dy) > 5) 
                    onDragEnd?.({ x: e.clientX, y: e.clientY });
                else
                    onClick?.();
                
                dragRef.current = null;
            }}
            
            onPointerEnter = {onPointerEnter}
            onPointerLeave = {onPointerLeave}
        >
            {children}
        </button>
    );
}
