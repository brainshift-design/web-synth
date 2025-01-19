import './tokens.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ClassProvider } from './contexts/ClassProvider';
import { ReactFlowProvider } from 'reactflow';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ClassProvider>
            <ReactFlowProvider>
                <App />
            </ReactFlowProvider>
        </ClassProvider>
    </StrictMode>
);