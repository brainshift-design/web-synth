import styles from './InputDisplay.module.css';
import { NbSp } from '../utils';


interface InputDisplayProps 
{
    text:       string;
    showValue?: boolean;
}


export default function InputDisplay({
    text, 
    showValue = true
}: InputDisplayProps) 
{
    return (
        <div className = {styles.inputDisplay}>
            {showValue ? text : NbSp}
        </div>
    );
}
