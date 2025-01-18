import { CSSProperties, ReactNode } from 'react';

import styles from './ParamButton.module.css';

interface ParamButtonProps {
    children?: ReactNode;
    background?: string;
    style?: CSSProperties;
    onClick?: () => void;
    onPointerDown?: (e: React.PointerEvent<HTMLButtonElement>) => void;
    onPointerUp?: () => void;
    onPointerMove?: () => void;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
}

export default function ParamButton({
    children,
    background = '#eee',
    style,
    onClick,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onPointerEnter,
    onPointerLeave,
}: ParamButtonProps) {
    return (
        <button
            className={styles.button}
            style=
                {{
                    background,
                    ...style
                }}
            onClick={onClick}
            onPointerDown={(e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                onPointerDown?.(e);
            }}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
        >
            {children}
        </button>
    );
}
