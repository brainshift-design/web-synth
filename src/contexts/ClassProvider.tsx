import { useState, type PropsWithChildren } from 'react';
import { ClassContext, type FilterType } from './ClassContext';
import { audioContext } from '../audio/audio';
import Graph from '../graph/Graph';


export function ClassProvider({ children }: PropsWithChildren) 
{
    const [graph] = useState(() => new Graph());
    const [, setUpdateCounter] = useState(0);
    const [filterTypes, setFilterTypes] = useState<FilterType[]>([]);


    const toggleAudio = (on: boolean) => 
    {
        if (on) audioContext?.resume();
        else    audioContext?.suspend();
    };


    // force update when graph changes
    const forceUpdate = () => setUpdateCounter(c => c + 1);
    graph.onNodesChanged = forceUpdate;


    return (
        <ClassContext.Provider
            value={{ 
                graph,
                nodes:    graph.reactNodes,
                edges:    graph.reactEdges,
                filterTypes,
                setNodes: (nodesOrFn) => {
                    const newNodes = typeof nodesOrFn === 'function'
                        ? nodesOrFn(graph.reactNodes)
                        : nodesOrFn;
                    
                    graph.reactNodes = newNodes;
                }, 
                setEdges: (edgesOrFn) => {
                    graph.reactEdges = 
                        typeof edgesOrFn === 'function'
                            ? edgesOrFn(graph.reactEdges) 
                            : edgesOrFn;
                },
                setFilterTypes, 
                toggleAudio 
            }}
        >
            {children}
        </ClassContext.Provider>
    );
}
