import GraphView from './components/GraphView';
import Toolbar from './components/Toolbar';
import ToolbarButtons from './components/ToolbarButtons';
import styles from './App.module.css';

function App() 
{
    return (
        <div className={styles.app}>
            <Toolbar>
                <ToolbarButtons />
            </Toolbar>
            <GraphView />
        </div>
    );
}

export default App;
