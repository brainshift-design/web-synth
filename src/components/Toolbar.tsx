import styles from './Toolbar.module.css';
import { ReactNode } from 'react';


interface ToolbarProps 
{
    children: ReactNode;
}


export default function Toolbar({ children }: ToolbarProps) 
{
    return (
        <div className={styles.toolbar}>
            {children}
        </div>
    );
}
