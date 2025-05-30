import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { BlockData, BlockType, Connection, Position, WorkflowState } from '../types';

// Mock functions for saving/loading from a database
const saveToDatabase = (blocks: BlockData[], connections: Connection[]) => {
  localStorage.setItem('workflow', JSON.stringify({ blocks, connections }));
  console.log('Workflow saved to database');
};

const loadFromDatabase = () => {
  const data = localStorage.getItem('workflow');
  if (data) {
    return JSON.parse(data);
  }
  return { blocks: [], connections: [] };
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  blocks: [],
  connections: [],
  isDirty: false,
  
  setIsDirty: (isDirty) => set({ isDirty }),
  
  addBlock: (block) => {
    set((state) => ({
      blocks: [...state.blocks, block],
      isDirty: true
    }));
  },
  
  updateBlockPosition: (id, position) => {
    set((state) => ({
      blocks: state.blocks.map((block) => 
        block.id === id ? { ...block, position } : block
      ),
      isDirty: true
    }));
  },
  
  removeBlock: (id) => {
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
      connections: state.connections.filter(
        (connection) => connection.from !== id && connection.to !== id
      ),
      isDirty: true
    }));
  },
  
  addConnection: (from, to) => {
    const connectionExists = get().connections.some(
      (conn) => conn.from === from && conn.to === to
    );
    
    if (!connectionExists) {
      set((state) => ({
        connections: [...state.connections, { id: uuidv4(), from, to }],
        isDirty: true
      }));
    }
  },
  
  removeConnection: (id) => {
    set((state) => ({
      connections: state.connections.filter((connection) => connection.id !== id),
      isDirty: true
    }));
  },
  
  saveWorkflow: () => {
    const { blocks, connections } = get();
    saveToDatabase(blocks, connections);
    set({ isDirty: false });
  },
  
  loadWorkflow: () => {
    const { blocks, connections } = loadFromDatabase();
    set({ blocks, connections, isDirty: false });
  },
  
  resetWorkflow: () => {
    set({ blocks: [], connections: [], isDirty: false });
  }
}));

// Utility function to create a block
export const createBlock = (type: BlockType, position: Position): BlockData => {
  let data = {};
  
  switch (type) {
    case BlockType.TASK:
      data = { title: 'New Task', description: 'Task description' };
      break;
    case BlockType.CONDITION:
      data = { condition: 'if (value > 0)' };
      break;
    case BlockType.ACTION:
      data = { action: 'Send Email' };
      break;
  }
  
  return {
    id: uuidv4(),
    type,
    position,
    data
  };
};