import GraphView from './components/GraphView';
import Toolbar from './components/Toolbar';
import ToolbarButtons from './components/ToolbarButtons';
import styles from './App.module.css';
import { ReactFlowProvider } from 'reactflow';

function App() 
{
    return (
        <ReactFlowProvider>
            <div className={styles.app}>
                <Toolbar>
                    <ToolbarButtons />
                </Toolbar>
                <GraphView />
            </div>
        </ReactFlowProvider>
    );
}

export default App;
