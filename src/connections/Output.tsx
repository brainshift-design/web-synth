import Handle from '../components/Handle';
import Port, { PortProps } from './Port';
import { PortType } from './PortType';
import styles from '../components/Handle.module.css';

export default class Output extends Port
{
    constructor(props: PortProps)
    {
        super({
            ...props, 
            type: PortType.Output
        });
    }

    render(): React.ReactNode
    {
        return (
            <Handle
                id        = {this.id}
                port      = {this}
                className = {styles.outputHandle}
            />
        )
    }
}
